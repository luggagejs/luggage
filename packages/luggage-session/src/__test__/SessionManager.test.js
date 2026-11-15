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
  setRefreshToken: jest.fn(),
  setAccessToken: jest.fn(),
  setAccessTokenExpiresAt: jest.fn()
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
    session = new SessionManager({ clientId: 'app-key', redirectUrl: '/app', auth, location, history, ...options })
    return session
  }

  beforeEach(() => {
    sessionStorage.clear()
    auth = fakeAuth()
    history = { replaceState: jest.fn() }
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

    it('uses a stored refresh token without redirecting', async () => {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, 'stored')

      await expect(session.authenticate()).resolves.toBe(true)
      expect(auth.setRefreshToken).toHaveBeenCalledWith('stored')
      expect(location.assign).not.toHaveBeenCalled()
    })

    it('rejects instead of redirecting again when Dropbox returned an error', async () => {
      create('https://app.test/app?error=access_denied&error_description=The+user+denied')

      await expect(session.authenticate()).rejects.toThrow('The user denied')
      expect(location.assign).not.toHaveBeenCalled()
    })

    it('rejects when the code exchange fails', async () => {
      auth.getAccessTokenFromCode.mockRejectedValue(new Error('invalid_grant'))
      create('https://app.test/app?code=old')

      await expect(session.authenticate()).rejects.toThrow('invalid_grant')
      expect(sessionStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull()
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
