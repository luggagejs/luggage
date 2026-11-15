import { luggageReducer, updateCollectionSuccess, startSyncing, finishSyncing, updateUserSuccess } from '../index.js'

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

  it('tracks syncing', () => {
    const syncing = luggageReducer(initial, startSyncing('@@luggage/ADD_RECORD'))
    expect(syncing.meta.syncing['@@luggage/ADD_RECORD']).toBe(true)
    expect(luggageReducer(syncing, finishSyncing('@@luggage/ADD_RECORD')).meta.syncing['@@luggage/ADD_RECORD'])
      .toBe(false)
  })
})
