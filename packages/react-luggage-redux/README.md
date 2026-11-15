# react-luggage-redux

Redux middleware and reducer that keep luggage collections in the store.

```sh
yarn add @luggage/react-luggage-redux @luggage/core
```

### Setup

```js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { luggageMiddleware, luggageReducer } from '@luggage/react-luggage-redux'
import SessionManager from '@luggage/luggage-session'
import { DropboxBackend } from '@luggage/core/dropbox'

const session = new SessionManager({ clientId: 'dropbox-app-key' })

const store = createStore(
  combineReducers({ luggage: luggageReducer }),
  applyMiddleware(luggageMiddleware({
    // required: resolves true when the user is signed in (may redirect and resolve false)
    authenticate: () => session.authenticate(),
    // called once after authentication; or pass a ready `luggage: new Luggage(backend)`
    createBackend: () => new DropboxBackend(session.getClient())
  }))
)
```

The reducer must be mounted at `luggage`.

### Actions

```js
import { fetchCollection, addRecord, updateRecord, deleteRecord } from '@luggage/react-luggage-redux'

dispatch(fetchCollection('articles'))                        // authenticates first if needed
dispatch(addRecord('articles', { id: 3, title: 'New' }))
dispatch(updateRecord('articles', { id: 3 }, { title: 'Renamed' }))
dispatch(deleteRecord('articles', { id: 3 }))
```

`updateRecord`/`deleteRecord` find the record with a filter (`{ id: 3 }`) and `updateRecord` merges
an object into it. Functions work as well (`record => record.id === 3`, `record => ({ ...record, title })`),
but actions with functions are not serializable: redux DevTools cannot show or replay them.
Prefer objects.

A collection has to be fetched before records can be added, updated or deleted.

### State

```js
state.luggage = {
  collections: { articles: [/* records */] },
  user: { authenticated: true },
  meta: {
    syncing: { '@@luggage/FETCH_COLLECTION': false, /* ... */ },
    errors: { '@@luggage/UPDATE_RECORD': { name: 'ConflictError', message: '...', collectionName: 'articles' } }
  }
}
```

The store holds only serializable data. Tokens and `Collection` instances stay inside the middleware.

### Errors

Every failed operation dispatches a failure action with the error, then `FINISH_SYNCING`:

| Action                      | Fields                                  |
| --------------------------- | --------------------------------------- |
| `AUTHENTICATE_USER_FAILURE` | `error`                                 |
| `FETCH_COLLECTION_FAILURE`  | `collectionName`, `error`               |
| `ADD_RECORD_FAILURE`        | `collectionName`, `recordData`, `error` |
| `UPDATE_RECORD_FAILURE`     | `collectionName`, `recordId`, `error`   |
| `DELETE_RECORD_FAILURE`     | `collectionName`, `recordId`, `error`   |

`error` is the `Error` the operation was rejected with (for example `ConflictError` or `RecordNotFoundError`
from `@luggage/core`). The reducer keeps `{ name, message }` of the last error of each operation in
`meta.errors` until the operation starts again.
