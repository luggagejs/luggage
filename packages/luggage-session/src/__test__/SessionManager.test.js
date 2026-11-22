/* eslint max-nested-callbacks: 0 */
import { jest } from '@jest/globals'
import { Dropbox, DropboxAuth } from 'dropbox'
import SessionManager, { REFRESH_TOKEN_KEY, CODE_VERIFIER_KEY } from '../index.js'

const fakeAuth = () => ({
  getAuthenticationUrl: jest.fn(() => Promise.resolve('https://www.dropbox.com/oauth2/authorize?x=1')),
  getCodeVerifier: jest.fn(() => 'verifier'),
  setCodeVerifier: jest.fn(),
  getAccessTokenFromCode: jest.fn(() => Promise.resolve({
    result: { access_token: 'access', refresh_token: 'refresh', expires_in: 14400 }
  })),
  checkAndRefreshAccessToken: jest.fn(() => Promise.resolve()),
  setRefreshToken: jest.fn(),
  setAccessToken: jest.fn(),
  setAccessTokenExpiresAt: jest.fn()
})

// Like a browser: replaceState changes location.search
const fakeHistory = location => ({
  replaceState: jest.fn((state, title, url) => {
    location.search = new URL(url, location.origin).search
  })
})

const invalidGrant = () => Object.assign(new Error('Response failed with a 400 code'), {
  status: 400,
  error: { error: 'invalid_grant', error_description: 'refresh token is invalid or revoked' }
})

const fakeLocation = (url = 'https://app.test/app') => {
  const parsed = new URL(url)
  return {
    origin: parsed.origin,
    pathname: parsed.pathname,
    search: parsed.search,
    hash: parsed.hash,
    assign: jest.fn()
  }
}

describe('SessionManager (PKCE)', () => {
  let auth
  let location
  let history
  let session

  const create = (url, options = {}) => {
    location = fakeLocation(url)
    history = fakeHistory(location)
    session = new SessionManager({ clientId: 'app-key', redirectUrl: '/app', auth, location, history, ...options })
    return session
  }

  beforeEach(() => {
    sessionStorage.clear()
    auth = fakeAuth()
    create()
  })

  it('requires a client id', () => {
    expect(() => new SessionManager({})).toThrow(/clientId/)
  })

  it('builds the redirect uri from the current origin', () => {
    expect(session.redirectUri).toEqual('https://app.test/app')
  })

  describe('authenticate', () => {
    it('redirects to Dropbox with PKCE and offline access and resolves false', async () => {
      await expect(session.authenticate()).resolves.toBe(false)

      expect(auth.getAuthenticationUrl).toHaveBeenCalledWith(
        'https://app.test/app', undefined, 'code', 'offline', undefined, undefined, true
      )
      expect(location.assign).toHaveBeenCalledWith('https://www.dropbox.com/oauth2/authorize?x=1')
      expect(sessionStorage.getItem(CODE_VERIFIER_KEY)).toEqual('verifier')
    })

    it('exchanges the code from the redirect for tokens', async () => {
      sessionStorage.setItem(CODE_VERIFIER_KEY, 'verifier')
      create('https://app.test/app?code=the-code&state=s&page=2#top')

      await expect(session.authenticate()).resolves.toBe(true)

      expect(auth.setCodeVerifier).toHaveBeenCalledWith('verifier')
      expect(auth.getAccessTokenFromCode).toHaveBeenCalledWith('https://app.test/app', 'the-code')
      expect(auth.setRefreshToken).toHaveBeenCalledWith('refresh')
      expect(sessionStorage.getItem(REFRESH_TOKEN_KEY)).toEqual('refresh')
      expect(sessionStorage.getItem(CODE_VERIFIER_KEY)).toBeNull()
      expect(history.replaceState).toHaveBeenCalledWith(null, '', '/app?page=2#top')
      expect(location.assign).not.toHaveBeenCalled()
    })

    it('exchanges the code once when called again before the exchange finished', async () => {
      create('https://app.test/app?code=the-code')

      await expect(Promise.all([session.authenticate(), session.authenticate()])).resolves.toEqual([true, true])
      expect(auth.getAccessTokenFromCode).toHaveBeenCalledTimes(1)
    })

    it('uses a stored refresh token after checking it, without redirecting', async () => {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, 'stored')

      await expect(session.authenticate()).resolves.toBe(true)
      expect(auth.setRefreshToken).toHaveBeenCalledWith('stored')
      expect(auth.checkAndRefreshAccessToken).toHaveBeenCalledTimes(1)
      expect(location.assign).not.toHaveBeenCalled()
    })

    it('forgets a revoked refresh token and redirects to sign in again', async () => {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, 'revoked')
      auth.checkAndRefreshAccessToken.mockRejectedValue(invalidGrant())

      await expect(session.authenticate()).resolves.toBe(false)
      expect(sessionStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull()
      expect(location.assign).toHaveBeenCalledWith('https://www.dropbox.com/oauth2/authorize?x=1')
    })

    it('keeps the refresh token and rejects when it cannot be checked for another reason', async () => {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, 'stored')
      auth.checkAndRefreshAccessToken.mockRejectedValue(new TypeError('Failed to fetch'))

      await expect(session.authenticate()).rejects.toThrow('Failed to fetch')
      expect(sessionStorage.getItem(REFRESH_TOKEN_KEY)).toEqual('stored')
      expect(location.assign).not.toHaveBeenCalled()
    })

    it('rejects when Dropbox returned an error, and the next call starts a new sign in', async () => {
      sessionStorage.setItem(CODE_VERIFIER_KEY, 'verifier')
      create('https://app.test/app?error=access_denied&error_description=The+user+denied&page=2#top')

      await expect(session.authenticate()).rejects.toThrow('The user denied')
      expect(location.assign).not.toHaveBeenCalled()
      expect(history.replaceState).toHaveBeenCalledWith(null, '', '/app?page=2#top')
      expect(sessionStorage.getItem(CODE_VERIFIER_KEY)).toBeNull()

      await expect(session.authenticate()).resolves.toBe(false)
      expect(location.assign).toHaveBeenCalledTimes(1)
    })

    it('rejects when the code exchange fails, and the next call starts a new sign in', async () => {
      sessionStorage.setItem(CODE_VERIFIER_KEY, 'verifier')
      auth.getAccessTokenFromCode.mockRejectedValue(new Error('invalid_grant'))
      create('https://app.test/app?code=old&state=s')

      await expect(session.authenticate()).rejects.toThrow('invalid_grant')
      expect(sessionStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull()
      expect(sessionStorage.getItem(CODE_VERIFIER_KEY)).toBeNull()
      expect(history.replaceState).toHaveBeenCalledWith(null, '', '/app')

      await expect(session.authenticate()).resolves.toBe(false)
      expect(auth.getAccessTokenFromCode).toHaveBeenCalledTimes(1)
      expect(location.assign).toHaveBeenCalledTimes(1)
    })

    it('can keep the session in another storage', async () => {
      const storage = new Map()
      const mapStorage = {
        getItem: k => (storage.has(k) ? storage.get(k) : null),
        setItem: (k, v) => storage.set(k, v),
        removeItem: k => storage.delete(k)
      }
      create('https://app.test/app?code=c', { storage: mapStorage })
      await session.authenticate()

      expect(storage.get(REFRESH_TOKEN_KEY)).toEqual('refresh')
      expect(sessionStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull()
    })
  })

  describe('getClient', () => {
    it('returns a Dropbox client that uses the session auth', () => {
      const client = session.getClient()
      expect(client).toBeInstanceOf(Dropbox)
      expect(client.auth).toBe(auth)
    })
  })

  describe('signOut', () => {
    it('forgets the refresh token', async () => {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, 'stored')
      session.signOut()

      expect(sessionStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull()
      await expect(session.authenticate()).resolves.toBe(false)
    })
  })

  it('recognises a revoked refresh token in the answer of the real DropboxAuth', async () => {
    // jsdom has no Response; the SDK reads ok, status, headers and text()
    const fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 400,
      headers: {},
      text: () => Promise.resolve(JSON.stringify({
        error: 'invalid_grant', error_description: 'refresh token is invalid or revoked'
      }))
    }))
    sessionStorage.setItem(REFRESH_TOKEN_KEY, 'revoked')
    auth = new DropboxAuth({ clientId: 'app-key', fetch })
    auth.getAuthenticationUrl = jest.fn(() => Promise.resolve('https://www.dropbox.com/oauth2/authorize?x=1'))
    auth.getCodeVerifier = jest.fn(() => 'verifier')
    create()

    await expect(session.authenticate()).resolves.toBe(false)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('grant_type=refresh_token'), expect.anything())
    expect(sessionStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull()
    expect(location.assign).toHaveBeenCalled()
  })

  it('uses DropboxAuth by default', () => {
    // Browsers have fetch, jsdom does not
    const originalFetch = globalThis.fetch
    globalThis.fetch = () => Promise.reject(new Error('no network in tests'))
    try {
      const real = new SessionManager({ clientId: 'app-key', location: fakeLocation(), history })
      expect(real.auth).toBeInstanceOf(DropboxAuth)
    } finally {
      globalThis.fetch = originalFetch
    }
  })
})
