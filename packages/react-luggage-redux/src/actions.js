import { createAction } from './utils.js'

/* Middleware requests */

export const FETCH_COLLECTION = '@@luggage/FETCH_COLLECTION'
export const AUTHENTICATE_USER = '@@luggage/AUTHENTICATE_USER'
export const ADD_RECORD = '@@luggage/ADD_RECORD'
export const UPDATE_RECORD = '@@luggage/UPDATE_RECORD'
export const DELETE_RECORD = '@@luggage/DELETE_RECORD'
export const START_SYNCING = '@@luggage/START_SYNCING'
export const FINISH_SYNCING = '@@luggage/FINISH_SYNCING'

export const fetchCollection = createAction(FETCH_COLLECTION, 'name')
export const authenticateUser = createAction(AUTHENTICATE_USER, 'afterAuthenticate')
export const addRecord = createAction(ADD_RECORD, 'collectionName', 'recordData')
// recordId: an object filter ({ id: 1 }) or a function; transform: an object to merge or a function.
// Objects keep actions serializable.
export const updateRecord = createAction(UPDATE_RECORD, 'collectionName', 'recordId', 'transform')
export const deleteRecord = createAction(DELETE_RECORD, 'collectionName', 'recordId')
export const startSyncing = createAction(START_SYNCING, 'source')
export const finishSyncing = createAction(FINISH_SYNCING, 'source')


/* Middleware responses */

export const UPDATE_USER_SUCCESS = '@@luggage/UPDATE_USER_SUCCESS'
export const UPDATE_COLLECTION_SUCCESS = '@@luggage/UPDATE_COLLECTION_SUCCESS'
export const ADD_RECORD_SUCCESS = '@@luggage/ADD_RECORD_SUCCESS'
export const UPDATE_RECORD_SUCCESS = '@@luggage/UPDATE_RECORD_SUCCESS'
export const DELETE_RECORD_SUCCESS = '@@luggage/DELETE_RECORD_SUCCESS'

export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, 'data')
export const updateCollectionSuccess = createAction(
  UPDATE_COLLECTION_SUCCESS, 'collectionName', 'data'
)
export const addRecordSuccess = createAction(
  ADD_RECORD_SUCCESS, 'collectionName', 'record'
)
export const updateRecordSuccess = createAction(
  UPDATE_RECORD_SUCCESS, 'collectionName', 'record', 'previousRecord'
)
export const deleteRecordSuccess = createAction(
  DELETE_RECORD_SUCCESS, 'collectionName', 'record'
)


/* Failures. `error` is the Error the operation was rejected with */

export const AUTHENTICATE_USER_FAILURE = '@@luggage/AUTHENTICATE_USER_FAILURE'
export const FETCH_COLLECTION_FAILURE = '@@luggage/FETCH_COLLECTION_FAILURE'
export const ADD_RECORD_FAILURE = '@@luggage/ADD_RECORD_FAILURE'
export const UPDATE_RECORD_FAILURE = '@@luggage/UPDATE_RECORD_FAILURE'
export const DELETE_RECORD_FAILURE = '@@luggage/DELETE_RECORD_FAILURE'

export const authenticateUserFailure = createAction(AUTHENTICATE_USER_FAILURE, 'error')
export const fetchCollectionFailure = createAction(FETCH_COLLECTION_FAILURE, 'collectionName', 'error')
export const addRecordFailure = createAction(ADD_RECORD_FAILURE, 'collectionName', 'recordData', 'error')
export const updateRecordFailure = createAction(UPDATE_RECORD_FAILURE, 'collectionName', 'recordId', 'error')
export const deleteRecordFailure = createAction(DELETE_RECORD_FAILURE, 'collectionName', 'recordId', 'error')
