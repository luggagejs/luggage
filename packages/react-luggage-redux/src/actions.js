import { createAction } from './utils'

/* Middleware requests */

export const FETCH_COLLECTION = '@@luggage/FETCH_COLLECTION'
export const AUTHENTICATE_USER = '@@luggage/AUTHENTICATE_USER'
export const ADD_RECORD = '@@luggage/ADD_RECORD'
export const UPDATE_RECORD = '@@luggage/UPDATE_RECORD'
export const DELETE_RECORD = '@@luggage/DELETE_RECORD'

export const fetchCollection = createAction(FETCH_COLLECTION, 'name')
export const authenticateUser = createAction(AUTHENTICATE_USER, 'afterAuthenticate')
export const addRecord = createAction(ADD_RECORD, 'collectionName', 'recordData')
export const updateRecord = createAction(UPDATE_RECORD, 'collectionName', 'recordId', 'transform')
export const deleteRecord = createAction(DELETE_RECORD, 'collectionName', 'recordId')


/* Middleware responses */

export const UPDATE_USER_SUCCESS = '@@luggage/UPDATE_USER_SUCCESS'
export const UPDATE_COLLECTION_SUCCESS = '@@luggage/UPDATE_COLLECTION_SUCCESS'
export const ADD_RECORD_SUCCESS = '@@luggage/ADD_RECORD_SUCCESS'
export const UPDATE_RECORD_SUCCESS = '@@luggage/UPDATE_RECORD_SUCCESS'
export const DELETE_RECORD_SUCCESS = '@@luggage/DELETE_RECORD_SUCCESS'

export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, 'data')
export const updateCollectionSuccess = createAction(
  UPDATE_COLLECTION_SUCCESS, 'collectionName', 'data', 'collection'
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
