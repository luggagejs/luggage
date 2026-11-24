import {
  luggageReducer, updateCollectionSuccess, startSyncing, finishSyncing, updateUserSuccess, authenticateUserFailure
} from '../index.js'

describe('luggageReducer', () => {
  const initial = luggageReducer(undefined, { type: '@@INIT' })

  it('has an initial state', () => {
    expect(initial.user).toEqual({ authenticated: false })
    expect(initial.collections).toEqual({})
  })

  it('stores collection data', () => {
    const state = luggageReducer(initial, updateCollectionSuccess('quotes', [1]))
    expect(state.collections.quotes).toEqual([1])
    expect(initial.collections).toEqual({})
  })

  describe('a state saved by 2.x (no meta.pending, meta.errors)', () => {
    const saved = {
      collections: { quotes: [1] },
      user: { authenticated: false },
      meta: { collections: {}, syncing: { '@@luggage/FETCH_COLLECTION': false } }
    }

    it('starts and finishes syncing', () => {
      const started = luggageReducer(saved, startSyncing('@@luggage/FETCH_COLLECTION'))
      expect(started.meta.syncing['@@luggage/FETCH_COLLECTION']).toBe(true)
      expect(started.meta.errors['@@luggage/FETCH_COLLECTION']).toBeNull()

      const finished = luggageReducer(started, finishSyncing('@@luggage/FETCH_COLLECTION'))
      expect(finished.meta.syncing['@@luggage/FETCH_COLLECTION']).toBe(false)
      expect(finished.collections.quotes).toEqual([1])
    })

    it('stores an error', () => {
      const state = luggageReducer(saved, authenticateUserFailure(new Error('offline')))
      expect(state.meta.errors['@@luggage/AUTHENTICATE_USER']).toEqual({ name: 'Error', message: 'offline' })
    })
  })

  it('merges user data', () => {
    const state = luggageReducer(initial, updateUserSuccess({ authenticated: true }))
    expect(state.user).toEqual({ authenticated: true })
  })

  it('forgets the authentication error when the user is updated after authentication', () => {
    const failed = luggageReducer(initial, authenticateUserFailure(new Error('offline')))
    expect(failed.meta.errors['@@luggage/AUTHENTICATE_USER']).toEqual({ name: 'Error', message: 'offline' })

    const state = luggageReducer(failed, updateUserSuccess({ authenticated: true }))
    expect(state.meta.errors['@@luggage/AUTHENTICATE_USER']).toBeNull()
  })

  it('tracks syncing', () => {
    const syncing = luggageReducer(initial, startSyncing('@@luggage/ADD_RECORD'))
    expect(syncing.meta.syncing['@@luggage/ADD_RECORD']).toBe(true)
    expect(luggageReducer(syncing, finishSyncing('@@luggage/ADD_RECORD')).meta.syncing['@@luggage/ADD_RECORD'])
      .toBe(false)
  })

  it('keeps syncing until the last of overlapping operations of one type finishes', () => {
    const source = '@@luggage/ADD_RECORD'
    const two = [startSyncing(source), startSyncing(source)].reduce(luggageReducer, initial)
    const one = luggageReducer(two, finishSyncing(source))
    const none = luggageReducer(one, finishSyncing(source))

    expect(one.meta.syncing[source]).toBe(true)
    expect(one.meta.pending[source]).toEqual(1)
    expect(none.meta.syncing[source]).toBe(false)
    expect(none.meta.pending[source]).toEqual(0)
    expect(luggageReducer(none, finishSyncing(source)).meta.pending[source]).toEqual(0)
  })
})
