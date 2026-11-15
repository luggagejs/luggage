import { Dropbox, DropboxAuth } from 'dropbox'

export const REFRESH_TOKEN_KEY = 'luggageRefreshToken'
export const CODE_VERIFIER_KEY = 'luggageCodeVerifier'

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
      this.auth.setRefreshToken(refreshToken)
      return Promise.resolve(true)
    }

    const params = new URLSearchParams(this.location.search)

    if (params.has('error')) {
      return Promise.reject(new Error(params.get('error_description') || params.get('error')))
    }

    if (params.has('code')) {
      return this.exchangeCode(params.get('code'))
    }

    return this.redirect().then(() => false)
  }

  exchangeCode(code) {
    const codeVerifier = this.storage.getItem(CODE_VERIFIER_KEY)

    if (codeVerifier) {
      this.auth.setCodeVerifier(codeVerifier)
    }

    return this.auth.getAccessTokenFromCode(this.redirectUri, code).then(({ result }) => {
      this.storage.setItem(REFRESH_TOKEN_KEY, result.refresh_token)
      this.storage.removeItem(CODE_VERIFIER_KEY)
      this.auth.setRefreshToken(result.refresh_token)
      this.auth.setAccessToken(result.access_token)
      this.auth.setAccessTokenExpiresAt(new Date(Date.now() + result.expires_in * 1000))
      this.removeCodeFromUrl()
      return true
    })
  }

  redirect() {
    return this.auth
      .getAuthenticationUrl(this.redirectUri, undefined, 'code', 'offline', undefined, undefined, true)
      .then(url => {
        this.storage.setItem(CODE_VERIFIER_KEY, this.auth.getCodeVerifier())
        this.location.assign(String(url))
      })
  }

  removeCodeFromUrl() {
    const params = new URLSearchParams(this.location.search)
    params.delete('code')
    params.delete('state')
    const search = params.toString()

    this.history.replaceState(null, '', `${this.location.pathname}${search ? `?${search}` : ''}${this.location.hash}`)
  }

  // A Dropbox client for DropboxBackend: new DropboxBackend(session.getClient())
  getClient() {
    return new Dropbox({ auth: this.auth })
  }

  signOut() {
    this.storage.removeItem(REFRESH_TOKEN_KEY)
    this.storage.removeItem(CODE_VERIFIER_KEY)
  }
}

export default SessionManager
