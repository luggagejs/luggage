import { Luggage } from '@luggage/core'
import { createHandler } from './utils.js'

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
  authenticateUserFailure,
  fetchCollectionFailure,
  addRecordFailure,
  updateRecordFailure,
  deleteRecordFailure,
  startSyncing,
  finishSyncing
} from './actions.js'

const notLoadedError = name => new Error(`Collection "${name}" is not loaded, dispatch fetchCollection first`)

// Options:
//   authenticate: () => boolean | Promise<boolean>, required. Resolves true when the user
//     is signed in. It may start a redirect to the sign in page and resolve false.
//   luggage: a Luggage instance, or
//   createBackend: () => backend | Promise<backend>, called once after authentication.
const luggageMiddleware = ({ authenticate, luggage, createBackend } = {}) => {
  if (typeof authenticate !== 'function') {
    throw new TypeError('luggageMiddleware: the authenticate option is required')
  }
  if (!luggage && typeof createBackend !== 'function') {
    throw new TypeError('luggageMiddleware: pass a luggage instance or a createBackend function')
  }

  return ({ getState, dispatch }) => {
    // Collection instances are not serializable, so they live here and not in the store
    const collections = new Map()
    let luggagePromise = luggage ? Promise.resolve(luggage) : null
    // Several actions can ask for authentication at once (fetches on start):
    // they share one authenticate() call
    let authentication = null

    const getLuggage = () => {
      if (!luggagePromise) {
        luggagePromise = Promise.resolve(createBackend()).then(backend => new Luggage(backend))
        luggagePromise.catch(() => {
          luggagePromise = null
        })
      }
      return luggagePromise
    }

    // An error thrown while the success is dispatched (a reducer, a subscriber) is reported
    // as the failure of the operation too, and syncing always finishes
    const run = (source, operation, onSuccess, onFailure) => {
      dispatch(startSyncing(source))
      return Promise.resolve()
        .then(operation)
        .then(onSuccess)
        .catch(error => dispatch(onFailure(error)))
        .finally(() => dispatch(finishSyncing(source)))
    }

    const loadedCollection = name => {
      const collection = collections.get(name)
      if (!collection) {
        throw notLoadedError(name)
      }
      return collection
    }

    // A record that nobody listens to does not subscribe to the collection,
    // dispose() makes sure nothing is left after the operation
    const withRecord = (collection, recordId, operation) => {
      const record = collection.find(recordId)
      return operation(record).finally(() => record.dispose())
    }

    const handle = createHandler({
      [FETCH_COLLECTION]: ({ action }) => {
        if (!getState().luggage.user.authenticated) {
          dispatch(authenticateUser(action))
          return
        }

        run(
          FETCH_COLLECTION,
          () => getLuggage().then(l => {
            const collection = collections.get(action.name) || l.collection(action.name)
            collections.set(action.name, collection)
            return collection.read()
          }),
          data => dispatch(updateCollectionSuccess(action.name, data)),
          error => fetchCollectionFailure(action.name, error)
        )
      },

      [AUTHENTICATE_USER]: ({ action }) => {
        if (!authentication) {
          authentication = Promise.resolve()
            .then(() => authenticate())
            .then(authenticated => {
              dispatch(updateUserSuccess({ authenticated: Boolean(authenticated) }))
              return Boolean(authenticated)
            }, error => {
              dispatch(authenticateUserFailure(error))
              return false
            })
            .finally(() => {
              authentication = null
            })
        }

        authentication.then(authenticated => {
          if (authenticated && action.afterAuthenticate) {
            dispatch(action.afterAuthenticate)
          }
        })
      },

      [ADD_RECORD]: ({ action }) => {
        const { collectionName, recordData } = action

        run(
          ADD_RECORD,
          () => loadedCollection(collectionName).add(recordData),
          ([newRecord, newCollection]) => {
            dispatch(addRecordSuccess(collectionName, newRecord))
            dispatch(updateCollectionSuccess(collectionName, newCollection))
          },
          error => addRecordFailure(collectionName, recordData, error)
        )
      },

      [UPDATE_RECORD]: ({ action }) => {
        const { collectionName, recordId, transform } = action

        run(
          UPDATE_RECORD,
          () => {
            const collection = loadedCollection(collectionName)
            return withRecord(collection, recordId, record => record.update(transform))
          },
          ([newRecord, oldRecord, newCollection]) => {
            dispatch(updateRecordSuccess(collectionName, newRecord, oldRecord))
            dispatch(updateCollectionSuccess(collectionName, newCollection))
          },
          error => updateRecordFailure(collectionName, recordId, error)
        )
      },

      [DELETE_RECORD]: ({ action }) => {
        const { collectionName, recordId } = action

        run(
          DELETE_RECORD,
          () => {
            const collection = loadedCollection(collectionName)
            return withRecord(collection, recordId, record => record.delete())
          },
          ([deletedRecord, newCollection]) => {
            dispatch(deleteRecordSuccess(collectionName, deletedRecord))
            dispatch(updateCollectionSuccess(collectionName, newCollection))
          },
          error => deleteRecordFailure(collectionName, recordId, error)
        )
      }
    })

    return next => action => handle({ getState, dispatch, next, action })
  }
}

export default luggageMiddleware
