import Luggage, { DropboxBackend } from '@luggage/core'
import LuggageSession from '@luggage/luggage-session'
import { createHandler } from './utils'

import {
  FETCH_COLLECTION,
  AUTHENTICATE_USER,
  ADD_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
  authenticateUser,
  updateUserSuccess,
  updateCollectionSuccess,
  addRecordSuccess,
  updateRecordSuccess,
  deleteRecordSuccess,
  startSyncing,
  finishSyncing
} from './actions'

const luggageMiddleware = ({
  apiKey,
  redirectUrl = '/',
  Backend = DropboxBackend,
  SessionManager = LuggageSession
}) => ({getState, dispatch}) => next => action => {
  createHandler({
    [FETCH_COLLECTION]: ({ getState, dispatch, action }) => {
      const { user } = getState().luggage

      if (user.authenticated) {
        let luggage = new Luggage(new Backend(user.token))
        let collection = luggage.collection(action.name)

        dispatch(startSyncing())

        collection.read().then(data => {
          dispatch(updateCollectionSuccess(action.name, data, collection))
          dispatch(finishSyncing())
        }).catch(() => {
          dispatch(finishSyncing())
        })
      } else {
        dispatch(authenticateUser(action))
      }
    },

    [AUTHENTICATE_USER]: ({ dispatch, action }) => {
      const sessionManager = new SessionManager({apiKey, redirectUrl})
      const token = sessionManager.getToken()

      dispatch(updateUserSuccess({ token, authenticated: true }))

      if (action.afterAuthenticate) {
        dispatch(action.afterAuthenticate)
      }
    },

    [ADD_RECORD]: ({ dispatch, action }) => {
      const { collectionName, recordData } = action
      const collection = getState().luggage.meta.collections[collectionName]

      if (collection) {
        dispatch(startSyncing())
        collection.add(recordData)
          .then(([newRecord, newCollection]) => {
            dispatch(addRecordSuccess(collectionName, newRecord))
            dispatch(updateCollectionSuccess(collectionName, newCollection, collection))
            dispatch(finishSyncing())
          }).catch(() => {
            dispatch(finishSyncing())
          })
      }
    },

    [UPDATE_RECORD]: ({ dispatch, action }) => {
      const { collectionName, recordId, transform } = action
      const collection = getState().luggage.meta.collections[collectionName]
      const record = collection.find(recordId)

      if (collection) {
        dispatch(startSyncing())
        collection.updateRecord(record, transform)
          .then(([newRecord, oldRecord, newCollection]) => {
            dispatch(updateRecordSuccess(collectionName, newRecord, oldRecord))
            dispatch(updateCollectionSuccess(collectionName, newCollection, collection))
            dispatch(finishSyncing())
          }).catch(() => {
            dispatch(finishSyncing())
          })
      }
    },

    [DELETE_RECORD]: ({ dispatch, action }) => {
      const { collectionName, recordId } = action
      const collection = getState().luggage.meta.collections[collectionName]
      const record = collection.find(recordId)

      if (collection) {
        dispatch(startSyncing())
        collection.deleteRecord(record)
          .then(([deletedRecord, newCollection]) => {
            dispatch(deleteRecordSuccess(collectionName, deletedRecord))
            dispatch(updateCollectionSuccess(collectionName, newCollection, collection))
            dispatch(finishSyncing())
          }).catch(() => {
            dispatch(finishSyncing())
          })
      }
    }
  })({ getState, dispatch, next, action })
}

export default luggageMiddleware
