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
  case actions.START_SYNCING:
    return setMeta(setMeta(state, 'syncing', action.source, true), 'errors', action.source, null)
  case actions.FINISH_SYNCING:
    return setMeta(state, 'syncing', action.source, false)
  default:
    return state
  }
}

export default luggageReducer
