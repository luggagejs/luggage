import Luggage from '../Luggage.js'
import DropboxBackend from '../backends/dropbox/index.js'
import Collection from '../Collection/index.js'

describe('Luggage', () => {
  let store

  beforeEach(() => {
    store = new Luggage(new DropboxBackend('test', 'test'))
  })

  describe('Luggage#collection', () => {
    it('returns Collection instance', () => {
      expect(store.collection('test')).toBeInstanceOf(Collection)
    })
  })
})
