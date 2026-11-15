import SessionManager from '../index.js'

describe('index exports', () => {
  describe('default', () => {
    it('is a constructor', () => {
      expect(SessionManager).toBeInstanceOf(Function)
    })
  })
})
