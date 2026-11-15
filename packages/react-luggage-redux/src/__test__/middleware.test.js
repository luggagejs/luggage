/* eslint max-nested-callbacks: 0 */
import { jest } from '@jest/globals'
import { Luggage } from '@luggage/core'
import DummyBackend from '@luggage/core/dummy'
import {
  luggageMiddleware,
  luggageReducer,
  fetchCollection,
  authenticateUser,
  addRecord,
  updateRecord,
  deleteRecord,
  FETCH_COLLECTION_FAILURE,
  ADD_RECORD_FAILURE,
  UPDATE_RECORD_FAILURE,
  DELETE_RECORD_FAILURE,
  AUTHENTICATE_USER_FAILURE,
  UPDATE_COLLECTION_SUCCESS,
  UPDATE_USER_SUCCESS
} from '../index.js'

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

// A tiny redux store: reducer + middleware, records dispatched actions
const createStore = middleware => {
  let state = { luggage: luggageReducer(undefined, { type: '@@INIT' }) }
  const actions = []
  let dispatch = null
  const store = {
    getState: () => state,
    dispatch: action => dispatch(action)
  }
  const next = action => {
    actions.push(action)
    state = { luggage: luggageReducer(state.luggage, action) }
    return action
  }
  dispatch = middleware(store)(next)
  return { ...store, actions }
}

describe('luggageMiddleware', () => {
  let backend
  let luggage
  let authenticate

  beforeEach(() => {
    backend = new DummyBackend('quotes', [{ id: 1, quote: 'a' }, { id: 2, quote: 'b' }])
    luggage = new Luggage(backend)
    authenticate = jest.fn(() => true)
  })

  const loadedStore = async (options = { luggage, authenticate }) => {
    const store = createStore(luggageMiddleware(options))
    store.dispatch(fetchCollection('quotes'))
    await flush()
    return store
  }

  describe('options', () => {
    it('requires authenticate', () => {
      expect(() => luggageMiddleware({ luggage })).toThrow(/authenticate/)
    })

    it('requires luggage or createBackend', () => {
      expect(() => luggageMiddleware({ authenticate })).toThrow(/luggage|createBackend/)
    })

    it('takes a backend factory', async () => {
      const createBackend = jest.fn(() => Promise.resolve(backend))
      const store = await loadedStore({ createBackend, authenticate })

      expect(store.getState().luggage.collections.quotes).toHaveLength(2)
      store.dispatch(fetchCollection('quotes'))
      await flush()
      expect(createBackend).toHaveBeenCalledTimes(1)
    })
  })

  describe('authentication', () => {
    it('authenticates before fetching and then fetches', async () => {
      const store = await loadedStore()

      expect(authenticate).toHaveBeenCalled()
      expect(store.getState().luggage.user).toEqual({ authenticated: true })
      expect(store.getState().luggage.collections.quotes).toEqual([{ id: 1, quote: 'a' }, { id: 2, quote: 'b' }])
    })

    it('does not mark the user authenticated and does not fetch when authentication did not succeed', async () => {
      authenticate.mockReturnValue(false)
      const store = await loadedStore()

      expect(store.getState().luggage.user).toEqual({ authenticated: false })
      expect(store.actions.map(a => a.type)).not.toContain(UPDATE_COLLECTION_SUCCESS)
    })

    it('does not keep a token in the store', async () => {
      const store = await loadedStore()
      const userUpdate = store.actions.find(a => a.type === UPDATE_USER_SUCCESS)
      expect(userUpdate.data).toEqual({ authenticated: true })
    })

    it('authenticates once for fetches dispatched before authentication finished', async () => {
      backend.collection('books').write([{ title: 't' }])
      authenticate.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 5)))
      const store = createStore(luggageMiddleware({ luggage, authenticate }))
      store.dispatch(fetchCollection('quotes'))
      store.dispatch(fetchCollection('books'))
      await new Promise(resolve => setTimeout(resolve, 20))

      expect(authenticate).toHaveBeenCalledTimes(1)
      expect(store.getState().luggage.collections.quotes).toHaveLength(2)
      expect(store.getState().luggage.collections.books).toEqual([{ title: 't' }])
    })

    it('dispatches AUTHENTICATE_USER_FAILURE when authenticate fails', async () => {
      authenticate.mockImplementation(() => Promise.reject(new Error('denied')))
      const store = createStore(luggageMiddleware({ luggage, authenticate }))
      store.dispatch(authenticateUser())
      await flush()

      const failure = store.actions.find(a => a.type === AUTHENTICATE_USER_FAILURE)
      expect(failure.error.message).toEqual('denied')
      expect(store.getState().luggage.user.authenticated).toBe(false)
    })
  })

  describe('state', () => {
    it('keeps only serializable data in the store', async () => {
      const store = await loadedStore()
      const state = store.getState()
      expect(JSON.parse(JSON.stringify(state))).toEqual(state)
    })
  })

  describe('records', () => {
    it('adds a record', async () => {
      const store = await loadedStore()
      store.dispatch(addRecord('quotes', { id: 3, quote: 'c' }))
      await flush()

      expect(store.getState().luggage.collections.quotes).toContainEqual({ id: 3, quote: 'c' })
    })

    it('updates a record found by an object filter with an object merge', async () => {
      const store = await loadedStore()
      store.dispatch(updateRecord('quotes', { id: 2 }, { quote: 'B' }))
      await flush()

      expect(store.getState().luggage.collections.quotes).toEqual([{ id: 1, quote: 'a' }, { id: 2, quote: 'B' }])
    })

    it('deletes a record', async () => {
      const store = await loadedStore()
      store.dispatch(deleteRecord('quotes', { id: 1 }))
      await flush()

      expect(store.getState().luggage.collections.quotes).toEqual([{ id: 2, quote: 'b' }])
    })

    it('does not leave subscriptions after update and delete', async () => {
      const createCollection = luggage.collection.bind(luggage)
      let collection
      luggage.collection = name => {
        collection = createCollection(name)
        return collection
      }
      const store = await loadedStore()
      store.dispatch(updateRecord('quotes', { id: 2 }, { quote: 'B' }))
      store.dispatch(deleteRecord('quotes', { id: 1 }))
      await flush()

      expect(store.getState().luggage.collections.quotes).toEqual([{ id: 2, quote: 'B' }])
      expect(collection.listenerCount('data')).toEqual(0)
    })
  })

  describe('failures', () => {
    it('dispatches FETCH_COLLECTION_FAILURE with the error', async () => {
      backend.collection('quotes').read = () => Promise.reject(new Error('offline'))
      const store = await loadedStore()

      const failure = store.actions.find(a => a.type === FETCH_COLLECTION_FAILURE)
      expect(failure).toMatchObject({ collectionName: 'quotes', error: expect.any(Error) })
      expect(store.getState().luggage.meta.syncing['@@luggage/FETCH_COLLECTION']).toBe(false)
      expect(store.getState().luggage.meta.errors['@@luggage/FETCH_COLLECTION'])
        .toEqual({ name: 'Error', message: 'offline', collectionName: 'quotes' })
    })

    it('dispatches ADD_RECORD_FAILURE with the error', async () => {
      const store = await loadedStore()
      backend.collection('quotes').write = () => Promise.reject(new Error('quota'))
      store.dispatch(addRecord('quotes', { id: 3 }))
      await flush()

      expect(store.actions.find(a => a.type === ADD_RECORD_FAILURE).error.message).toEqual('quota')
    })

    it('dispatches UPDATE_RECORD_FAILURE when the record is not found', async () => {
      const store = await loadedStore()
      store.dispatch(updateRecord('quotes', { id: 42 }, { quote: 'x' }))
      await flush()

      expect(store.actions.find(a => a.type === UPDATE_RECORD_FAILURE).error.name).toEqual('RecordNotFoundError')
    })

    it('dispatches DELETE_RECORD_FAILURE with the error', async () => {
      const store = await loadedStore()
      store.dispatch(deleteRecord('quotes', { id: 42 }))
      await flush()

      expect(store.actions.find(a => a.type === DELETE_RECORD_FAILURE).error.name).toEqual('RecordNotFoundError')
    })

    ;[
      ['update', () => updateRecord('quotes', { id: 1 }, { quote: 'x' }), UPDATE_RECORD_FAILURE],
      ['delete', () => deleteRecord('quotes', { id: 1 }), DELETE_RECORD_FAILURE],
      ['add', () => addRecord('quotes', { id: 3 }), ADD_RECORD_FAILURE]
    ].forEach(([name, action, failureType]) => {
      it(`does not throw on ${name} before the collection is loaded`, async () => {
        const store = createStore(luggageMiddleware({ luggage, authenticate }))
        expect(() => store.dispatch(action())).not.toThrow()
        await flush()

        expect(store.actions.find(a => a.type === failureType).error.message).toMatch(/not loaded/)
      })
    })
  })
})
