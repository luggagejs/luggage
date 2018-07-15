import SessionManager from '../index'

describe('index exports', () => {
  describe('default', () => {
    it('is a constructor', () => {
      expect(SessionManager).toBeInstanceOf(Function)
    })
  })
})
