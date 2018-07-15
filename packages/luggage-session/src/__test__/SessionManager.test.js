import SessionManager, { TOKEN_KEY } from '../SessionManager'
import { setURL } from './testUtils'

describe('SessionManager', () => {
  let session

  beforeEach(() => {
    session = new SessionManager({
      apiKey: 'someApiKey',
      redirectUrl: '/app'
    })
  })

  afterEach(() => {
    // Cleanup sessionStorage
    global.sessionStorage.removeItem(TOKEN_KEY)
  })

  describe('constructor', () => {
    it('sets instance variables', () => {
      expect(session.apiKey).toEqual('someApiKey')
      expect(session.redirectUrl).toEqual('/app')
    })

    it('has defaults for redirectUrl', () => {
      session = new SessionManager({ apiKey: 'someApiKey'})
      expect(session.redirectUrl).toEqual('/')
    })
  })

  describe('getToken', () => {
    it('gets token from instance variable', () => {
      session.token = 'someToken'
      expect(session.getToken()).toEqual('someToken')
    })

    it('gets token from storage', () => {
      const getTokenFromStorage = jest.fn()
      getTokenFromStorage.mockReturnValue('someTokenFromStorage')
      session.getTokenFromStorage = getTokenFromStorage

      expect(session.getToken()).toEqual('someTokenFromStorage')
    })

    it('gets token form url', () => {
      const getTokenFromUrl = jest.fn()
      getTokenFromUrl.mockReturnValue('someTokenFromUrl')
      session.getTokenFromUrl = getTokenFromUrl

      expect(session.getToken()).toEqual('someTokenFromUrl')
    })

    it('redirects if there is no token', () => {
      session.redirect = jest.fn()
      session.getToken()

      expect(session.redirect).toBeCalled()
    })
  })

  describe('setToken', () => {
    it('sets instance variable', () => {
      session.setToken('someToken')
      expect(session.token).toEqual('someToken')
    })

    it('saves token to sessionStorage', () => {
      session.setToken('someToken')
      expect(global.sessionStorage.getItem(TOKEN_KEY)).toEqual('someToken')
    })
  })

  describe('getTokenFromStorage', () => {
    it('gets token from session storage', () => {
      global.sessionStorage.setItem(TOKEN_KEY, 'someToken')
      expect(session.getTokenFromStorage()).toEqual('someToken')
    })

    it('returns null if session storage is empty', () => {
      expect(session.getTokenFromStorage()).toEqual(null)
    })
  })

  describe('getTokenFromUrl', () => {
    it('returns access_token url param', () => {
      global.location.hash = 'access_token=tokenFromUrl'
      session.removeHash = jest.fn()

      expect(session.getTokenFromUrl()).toEqual('tokenFromUrl')
      expect(session.removeHash).toBeCalled()
    })
  })

  describe('redirect', () => {
    it('gets authentication url from dropbox', () => {
      session.redirect()
      expect(global.location.href).toBeDefined()
    })
  })

  describe('authUrl', () => {
    it('returns current location absolute url', () => {
      setURL('http://github.com')
      expect(session.authUrl).toEqual('http://github.com/app')
    })

    it('strips search params', () => {
      setURL('http://github.com#test?foo=bar')
      expect(session.authUrl).toEqual('http://github.com/app')
    })
  })
})
