import { Dropbox, DropboxAuth } from 'dropbox'

export const REFRESH_TOKEN_KEY = 'luggageRefreshToken'
export const CODE_VERIFIER_KEY = 'luggageCodeVerifier'
export const STATE_KEY = 'luggageOAuthState'

const OAUTH_PARAMS = ['code', 'state', 'error', 'error_description']

// Dropbox answers a refresh with a revoked or expired refresh token with 400 invalid_grant
const isInvalidGrant = error => error?.status === 400 && error?.error?.error === 'invalid_grant'

// Sent to Dropbox and checked on return: only a code for a sign in started here is exchanged
const randomState = () =>
  Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('')

// Dropbox sign in with the OAuth 2 code flow and PKCE.
// The refresh token is kept in `storage` (sessionStorage by default);
// the Dropbox client refreshes the short-lived access token by itself.
class SessionManager {
  constructor({
    clientId,
    redirectUrl = '/',
    storage = globalThis.sessionStorage,
    auth,
    location = globalThis.location,
    history = globalThis.history
  } = {}) {
    if (!clientId) {
      throw new TypeError('SessionManager: clientId (the Dropbox app key) is required')
    }

    this.clientId = clientId
    this.redirectUrl = redirectUrl
    this.storage = storage
    this.location = location
    this.history = history
    this.auth = auth || new DropboxAuth({ clientId })
  }

  get redirectUri() {
    return new URL(this.redirectUrl, this.location.origin).href
  }

  // Resolves true when the user is signed in. Otherwise starts a redirect
  // to the Dropbox sign in page and resolves false.
  // Calls made while a sign in is in progress share it: a code can be exchanged only once.
  authenticate() {
    if (!this.pending) {
      this.pending = this.startAuthentication().finally(() => {
        this.pending = null
      })
    }
    return this.pending
  }

  startAuthentication() {
    const refreshToken = this.storage.getItem(REFRESH_TOKEN_KEY)

    if (refreshToken) {
      return this.useRefreshToken(refreshToken)
    }

    const params = new URLSearchParams(this.location.search)

    // The failed answer is removed from the url, so the next authenticate() starts a new sign in
    if (params.has('error')) {
      this.forgetSignInAttempt()
      return Promise.reject(new Error(params.get('error_description') || params.get('error')))
    }

    if (params.has('code')) {
      return this.exchangeCode(params.get('code'), params.get('state'))
    }

    return this.redirect().then(() => false)
  }

  // Checks the stored refresh token by getting an access token with it.
  // A revoked or expired token is forgotten and a new sign in starts;
  // other errors (no network) reject and keep the token.
  useRefreshToken(refreshToken) {
    this.auth.setRefreshToken(refreshToken)

    return this.auth.checkAndRefreshAccessToken().then(
      () => true,
      error => {
        if (!isInvalidGrant(error)) {
          throw error
        }
        this.signOut()
        return this.redirect().then(() => false)
      }
    )
  }

  exchangeCode(code, state) {
    const expectedState = this.storage.getItem(STATE_KEY)
    const codeVerifier = this.storage.getItem(CODE_VERIFIER_KEY)

    // In a promise: the SDK throws synchronously when it has no code verifier
    return Promise.resolve()
      .then(() => {
        if (!expectedState || state !== expectedState) {
          throw new Error('SessionManager: the code in the url does not answer a sign in started here')
        }
        if (codeVerifier) {
          this.auth.setCodeVerifier(codeVerifier)
        }
        return this.auth.getAccessTokenFromCode(this.redirectUri, code)
      })
      .then(({ result }) => {
        this.storage.setItem(REFRESH_TOKEN_KEY, result.refresh_token)
        this.storage.removeItem(CODE_VERIFIER_KEY)
        this.storage.removeItem(STATE_KEY)
        this.auth.setRefreshToken(result.refresh_token)
        this.auth.setAccessToken(result.access_token)
        this.auth.setAccessTokenExpiresAt(new Date(Date.now() + result.expires_in * 1000))
        this.removeOAuthParamsFromUrl()
        return true
      }, error => {
        // A code can be exchanged only once: drop it, so the next authenticate() starts a new sign in
        this.forgetSignInAttempt()
        throw error
      })
  }

  redirect() {
    const state = randomState()

    return this.auth
      .getAuthenticationUrl(this.redirectUri, state, 'code', 'offline', undefined, undefined, true)
      .then(url => {
        this.storage.setItem(CODE_VERIFIER_KEY, this.auth.getCodeVerifier())
        this.storage.setItem(STATE_KEY, state)
        this.location.assign(String(url))
      })
  }

  forgetSignInAttempt() {
    this.storage.removeItem(CODE_VERIFIER_KEY)
    this.storage.removeItem(STATE_KEY)
    this.removeOAuthParamsFromUrl()
  }

  removeOAuthParamsFromUrl() {
    const params = new URLSearchParams(this.location.search)
    OAUTH_PARAMS.forEach(name => params.delete(name))
    const search = params.toString()

    this.history.replaceState(null, '', `${this.location.pathname}${search ? `?${search}` : ''}${this.location.hash}`)
  }

  // A Dropbox client for DropboxBackend: new DropboxBackend(session.getClient())
  getClient() {
    return new Dropbox({ auth: this.auth })
  }

  // Clients from getClient() share this.auth, so they stop working too
  signOut() {
    this.storage.removeItem(REFRESH_TOKEN_KEY)
    this.storage.removeItem(CODE_VERIFIER_KEY)
    this.storage.removeItem(STATE_KEY)
    this.auth.setRefreshToken(undefined)
    this.auth.setAccessToken(undefined)
    this.auth.setAccessTokenExpiresAt(undefined)
  }
}

export default SessionManager
