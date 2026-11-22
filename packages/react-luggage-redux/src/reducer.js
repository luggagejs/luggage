import * as actions from './actions.js'

const initialState = {
  collections: {},
  user: {
    authenticated: false
  },
  meta: {
    syncing: {
      [actions.FETCH_COLLECTION]: false,
      [actions.ADD_RECORD]: false,
      [actions.UPDATE_RECORD]: false,
      [actions.DELETE_RECORD]: false
    },
    // Number of running operations of each type; syncing is true while it is above 0
    pending: {},
    // The last error of each operation as { name, message, collectionName }
    errors: {}
  }
}

const failures = {
  [actions.AUTHENTICATE_USER_FAILURE]: actions.AUTHENTICATE_USER,
  [actions.FETCH_COLLECTION_FAILURE]: actions.FETCH_COLLECTION,
  [actions.ADD_RECORD_FAILURE]: actions.ADD_RECORD,
  [actions.UPDATE_RECORD_FAILURE]: actions.UPDATE_RECORD,
  [actions.DELETE_RECORD_FAILURE]: actions.DELETE_RECORD
}

const serializeError = (error, collectionName) => ({
  name: (error && error.name) || 'Error',
  message: (error && error.message) || String(error),
  ...(collectionName ? { collectionName } : {})
})

const setMeta = (state, key, source, value) => ({
  ...state,
  meta: {
    ...state.meta,
    [key]: { ...state.meta[key], [source]: value }
  }
})

const luggageReducer = (state = initialState, action) => {
  if (Object.hasOwn(failures, action.type)) {
    return setMeta(state, 'errors', failures[action.type], serializeError(action.error, action.collectionName))
  }

  switch (action.type) {
  case actions.UPDATE_USER_SUCCESS:
    // authenticate() succeeded, so an earlier authentication error is no longer current
    return setMeta({ ...state, user: { ...state.user, ...action.data } }, 'errors', actions.AUTHENTICATE_USER, null)
  case actions.UPDATE_COLLECTION_SUCCESS:
    return { ...state, collections: { ...state.collections, [action.collectionName]: action.data } }
  case actions.START_SYNCING: {
    const pending = (state.meta.pending[action.source] || 0) + 1
    const started = setMeta(setMeta(state, 'pending', action.source, pending), 'syncing', action.source, true)
    return setMeta(started, 'errors', action.source, null)
  }
  case actions.FINISH_SYNCING: {
    // Operations of one type can overlap: syncing ends with the last of them
    const pending = Math.max((state.meta.pending[action.source] || 0) - 1, 0)
    return setMeta(setMeta(state, 'pending', action.source, pending), 'syncing', action.source, pending > 0)
  }
  default:
    return state
  }
}

export default luggageReducer
