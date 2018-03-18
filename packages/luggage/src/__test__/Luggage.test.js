import Luggage from '../Luggage'
import DropboxBackend from '../backends/DropboxBackend'
import Collection from '../Collection'

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
