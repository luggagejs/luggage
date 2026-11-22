# Migrating from luggage 2.x to 3.0

All three packages move to 3.0 together. The file format does not change:
collections stay in `/<collection>.json` and `/<name>/.meta.json`, so existing data works as is.

## Requirements

- The packages are published as ES modules without a build step. Use Node 22+ or a bundler
  (webpack 5, Vite, Rollup, esbuild, shadow-cljs). The browser bundle `@luggage/core/browser/index.js`
  is gone.
- `dropbox` is now a peer dependency, version 10. Install it yourself if you use Dropbox:
  `yarn add dropbox@^10`.

## @luggage/core

### Backends are imported from their own entry points

```diff
- import { Luggage, DropboxBackend, GoogleDriveBackend } from '@luggage/core'
+ import { Luggage } from '@luggage/core'
+ import { DropboxBackend } from '@luggage/core/dropbox'
+ import { GoogleDriveBackend, getAPIClient, handleSignIn } from '@luggage/core/google-drive'
```

| 2.x                                                   | 3.0                                           |
| ----------------------------------------------------- | --------------------------------------------- |
| `DropboxBackend` from `@luggage/core`                 | `@luggage/core/dropbox`                       |
| `GoogleDriveBackend` from `@luggage/core`             | `@luggage/core/google-drive`                  |
| `DummyBackend` from `@luggage/core`                   | `@luggage/core/dummy`                         |
| `getAPIClient`, `handleSignIn` from `.../backends/utils` | `@luggage/core/google-drive`               |
| `DropboxXMLHttpBackend`                               | removed, use `DropboxBackend`                 |
| `DropboxClientBackend`                                | removed, use `DropboxBackend`                 |
| `DropboxNodeBackend` (`build/backends/...`)           | removed, `DropboxBackend` works in Node       |

### DropboxBackend takes a Dropbox client

`new DropboxBackend(token)` still works and creates a client with that access token.
Dropbox access tokens are short-lived now, so instead of creating a backend for every request
to get a fresh token, give the backend a client that refreshes the token itself:

```diff
- const backend = new DropboxBackend(getFreshToken())
+ import { Dropbox, DropboxAuth } from 'dropbox'
+ const auth = new DropboxAuth({ clientId: APP_KEY, refreshToken })
+ const backend = new DropboxBackend(new Dropbox({ auth }))
```

In the browser, `@luggage/luggage-session` signs the user in and returns such a client (see below).

### Errors are rejected instead of being swallowed

| Situation                                              | 2.x                                    | 3.0                                        |
| ------------------------------------------------------ | -------------------------------------- | ------------------------------------------ |
| read fails with any `path/...` error other than `not_found` (`restricted_content`, `locked`, ...) | resolved `[]` | rejects with `DropboxResponseError` |
| write or delete fails (401, 409, 429, ...)             | resolved as success (XMLHttp, Node)    | rejects                                    |
| file is not valid json                                 | promise never settled                  | rejects with `ParseError`                  |
| `update`/`delete` of a record that is not in the file  | deleted the last record / lost the change | rejects with `RecordNotFoundError`, file unchanged |
| `Collections#create` with a name that is already listed | overwrote the collection with `[]`     | rejects with `CollectionExistsError`       |
| file changed by another device since it was read       | the other change was lost              | rejects with `ConflictError`, nothing written |
| missing file                                           | `[]` (`{}` for meta)                   | the same                                   |

Dropbox errors are `DropboxResponseError` from the `dropbox` package (`error.status`,
`error.error.error_summary`), not JSON strings any more.

The new error classes are exported from `@luggage/core`:

```js
import { ConflictError, RecordNotFoundError, CollectionExistsError, ParseError } from '@luggage/core'
```

### Conflicts are not retried

`add`, `update` and `delete` write the file only if it is still at the revision they read. On `ConflictError`
nothing is written; to retry, run the operation again. Luggage leaves the decision to the application.

`Collection#write(data)` still overwrites the file unconditionally.

### Backend contract (only if you wrote your own backend)

2.x backends keep working without changes: they get the queue of operations but no conflict detection.
To get conflict detection, set `supportsRevisions = true` on the objects returned by `collection()` and
`collections()`, resolve `{ data, rev }` from `read()`/`readMetaInfo()` (`rev: null` when the file does not exist)
and take `write(data, { rev })`/`writeMetaInfo(data, { rev })`, rejecting with `ConflictError` when the
file is not at `rev`. See "Writing a backend" in the [core README](packages/luggage/README.md).

### Events

The API stays `on`/`off`/`once`/`emit`/`removeListener`/`removeAllListeners`/`listenerCount`, but it no longer
comes from Node's `events` package: other `EventEmitter` methods (`prependListener`, `setMaxListeners`, ...)
are gone.

`where()` and `find()` subscribe to their collection only while they have listeners. Call `off()` or the new
`dispose()` when you stop listening; in 2.x every `where()`/`find()` stayed subscribed forever.

### Smaller changes

- `Collections#readMeta(lens)` and `Collections#writeMeta(lens, value)` (lorgnette lenses) are removed.
  Use `readMetaProperty(name, defaultValue)` and `writeMetaProperty(name, value)`.
- `update` and `delete` read the file once instead of twice, so one update emits two `data` events
  (read and write) instead of three.
- Deleting a collection whose file is already gone succeeds.

## @luggage/luggage-session

The implicit flow (`#access_token=...` in the url) is deprecated by Dropbox. 3.0 uses the code flow with PKCE.

```diff
- const session = new LuggageSession({ apiKey: APP_KEY, redirectUrl: '/app' })
- const token = session.getToken()     // redirects if there is no token
- const backend = new DropboxBackend(token)
+ const session = new LuggageSession({ clientId: APP_KEY, redirectUrl: '/app' })
+ if (await session.authenticate()) {  // redirects and resolves false if not signed in
+   const backend = new DropboxBackend(session.getClient())
+ }
```

- `apiKey` is now `clientId`.
- `getToken()`, `setToken()`, `getTokenFromUrl()` and `getTokenFromStorage()` are gone. The session keeps a
  refresh token (`sessionStorage` by default, `storage` option to change) instead of an access token.
- New: `signOut()`.
- Check that the redirect url is listed in the redirect URIs of your Dropbox app.

## @luggage/react-luggage-redux

### Peer dependency

The package now declares `@luggage/core` `^3` as a peer dependency (2.x pointed to a package that does
not exist, which forced `legacy-peer-deps`). It no longer depends on `@luggage/luggage-session`.

### Middleware options

```diff
- luggageMiddleware({ apiKey, redirectUrl, Backend, SessionManager })
+ luggageMiddleware({
+   authenticate: () => session.authenticate(),                 // required
+   createBackend: () => new DropboxBackend(session.getClient())  // or luggage: new Luggage(backend)
+ })
```

- `authenticate` is required and returns (or resolves) `true` when the user is signed in. The middleware no
  longer creates a `SessionManager` itself.
- `luggage` (a ready `Luggage`) or `createBackend` (called once, may return a promise) replaces `Backend`:
  the middleware no longer calls `new Backend(user.token)`, so any backend works, including `GoogleDriveBackend`.
- `apiKey`, `redirectUrl`, `Backend` and `SessionManager` are removed.

### State

- `state.luggage.user.token` is gone; `user` is `{ authenticated }`.
- `state.luggage.meta.collections` (the `Collection` instances) is gone.
- New: `state.luggage.meta.errors`.
- `updateCollectionSuccess(collectionName, data)` has no third `collection` argument.

### Authentication

`AUTHENTICATE_USER` sets `authenticated: true` only when `authenticate` says so, and dispatches
`afterAuthenticate` only then. In 2.x it marked the user authenticated even while redirecting and sent
requests with `Bearer undefined`.

### Failure actions

`*_FAILURE` actions are dispatched with the error before `FINISH_SYNCING`:
`AUTHENTICATE_USER_FAILURE`, `FETCH_COLLECTION_FAILURE`, `ADD_RECORD_FAILURE`, `UPDATE_RECORD_FAILURE`,
`DELETE_RECORD_FAILURE`. Adding, updating or deleting in a collection that was not fetched dispatches the
failure action (in 2.x it was ignored or threw).

### Serializable actions

`recordId` and `transform` can still be functions, but objects keep actions serializable:
`updateRecord('articles', { id: 3 }, { title: 'Renamed' })`.
