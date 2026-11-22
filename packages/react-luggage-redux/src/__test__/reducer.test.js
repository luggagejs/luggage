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
})
