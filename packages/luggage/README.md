# luggage

Dropbox and Google Drive file API wrapper for storing json data.

> Have you ever noticed that their stuff is shit and your shit is stuff?
(George Carlin)

Each collection is one json file (`/<collection>.json`) that holds an array of records.

Upgrading from 2.x? See the [migration guide](../../MIGRATION.md).

### Install

```sh
yarn add @luggage/core dropbox   # dropbox is needed only for the Dropbox backend
```

The packages are published as ES modules and need Node 22+ or a bundler.

### Usage

```js
import { Luggage } from '@luggage/core'
import { DropboxBackend } from '@luggage/core/dropbox'

const backend = new DropboxBackend(token)
const store = new Luggage(backend)
const articles = store.collection('articles')
```

Every backend has its own entry point, so an application bundles only the one it uses:

| Import                        | Exports                                               |
| ----------------------------- | ----------------------------------------------------- |
| `@luggage/core`               | `Luggage`, `Collection`, `Collections`, error classes |
| `@luggage/core/dropbox`       | `DropboxBackend`                                      |
| `@luggage/core/google-drive`  | `GoogleDriveBackend`, `getAPIClient`, `handleSignIn`  |
| `@luggage/core/dummy`         | `DummyBackend` (in-memory, for tests)                 |

### Dropbox

`DropboxBackend` takes a client from the [`dropbox`](https://www.npmjs.com/package/dropbox) package (version 10).
A client created with `DropboxAuth` and a refresh token refreshes the access token by itself,
so one backend can live as long as the application:

```js
import { Dropbox, DropboxAuth } from 'dropbox'
import { DropboxBackend } from '@luggage/core/dropbox'

const auth = new DropboxAuth({ clientId: APP_KEY, refreshToken })
const backend = new DropboxBackend(new Dropbox({ auth }))
```

`new DropboxBackend(accessToken)` is a shortcut for a client with a fixed access token.
[`@luggage/luggage-session`](../luggage-session) signs the user in and gives you such a client in the browser.

The same backend works in browsers and in Node.

### Google Drive

```js
import { GoogleDriveBackend, getAPIClient } from '@luggage/core/google-drive'

getAPIClient(config).then(gapi => {
  const store = new Luggage(new GoogleDriveBackend(gapi, { folderName: 'my-app' }))
})
```

### Filtering

```js
articles.where({ author: 'John Doe' }).read().then((articles) => {
  console.log('John\'s articles:', articles);
});

/* or you can provide a function */
articles.where(article => article.authors.includes('John Doe')).read().then((articles) => {
  console.log('John\'s articles:', articles);
});

/* Listen to filtered data updates */
articles.where({ author: 'John Doe' }).on('data', (articles) => {
  console.log('John\'s articles:', articles);
});

/* You can stack conditions */
articles.where({ author: 'John Doe' }).where(article => article.comments > 0)

/* or more readable */
articles.where({ author: 'John Doe' }).and(article => article.comments > 0)
```

### Finding single record

```js
/* Collection#find returns the first record found */
articles.find({ author: 'John Doe' }).read().then((article) => {
  console.log('John\'s article:', article);
});

/* Collection#find takes a function */
articles.find(article => article.author === 'John Doe').read().then((article) => {
  console.log('John\'s article:', article);
});

/* Listen to single record updates */
articles.find({ author: 'John Doe' }).on('data', (article) => {
  console.log('John\'s article:', article);
});
```

### Updating record

```js
/* Simple merge with existing record */
articles.find({ id: 1 }).update({ author: 'Jane Doe' }).then(([article]) => {
  console.log('Author changed:', article.author);
});

/* Record#update takes a function (surprise :)) */
articles.find(article => article.id === 42).update((article) => {
  article.authors.push('Jane Doe');
  return article;           // Do not forget to return new record
})
```

The record is looked up with the whole `where`/`find` chain in the file as it is right before the update.
If nothing matches, the promise is rejected with `RecordNotFoundError` and the file is not changed.
Records have no ids, so if several records match, the first one is updated: give records an `id` if that matters.

### Adding new record

```js
articles.add({ author: 'John Doe', body: 'Blah blah blah mr. Freeman' }).then(([article]) => {
  console.log('New article was added:', article);
});
```

### Deleting record

```js
articles.find({ id: 1 }).delete().then(([article]) => {
  console.log('No longer within collection:', article);
});
```

As with updates, a record that is not in the file rejects with `RecordNotFoundError`.

### Replacing the whole collection

```js
articles.write([{ id: 1 }])
```

`Collection#write` overwrites the file with whatever it is given, even if somebody else changed it meanwhile.
Use `add`, `update` and `delete` for changes that must not overwrite other changes.

### Concurrent changes and conflicts

Every change reads the file, changes it and writes the whole file back.

- Changes of one collection made in one application run one after another, so
  `Promise.all([articles.add(a), articles.add(b)])` keeps both records.
- With Dropbox, a change is written only if the file is still at the revision it was read at.
  If another device or tab changed the file in between, the promise is rejected with `ConflictError`
  and nothing is written. Luggage does not retry: only the application knows whether its change still
  makes sense on top of the other one. To retry, run the same operation again — it reads the file anew.

```js
import { ConflictError } from '@luggage/core'

const rename = () => articles.find({ id: 1 }).update({ title: 'New title' })

rename().catch(error => {
  if (error instanceof ConflictError) {
    return rename()
  }
  throw error
})
```

The Google Drive backend does not check revisions.

### Errors

| Error                   | When                                                            |
| ----------------------- | --------------------------------------------------------------- |
| `ConflictError`         | the file was changed by somebody else since it was read          |
| `RecordNotFoundError`   | `update`/`delete` found no record matching the chain            |
| `CollectionExistsError` | `Collections#create` with a name that is already in the list    |
| `ParseError`            | the file is not valid json                                       |
| `DropboxResponseError`  | any other Dropbox error (from the `dropbox` package)            |

A missing file reads as an empty collection. Any other read error rejects, so a failed read never
turns into an empty collection that the next write would save over your data.

### Events

`Collection`, filtered collections and records emit `data` with the data they read or wrote.
They have `on`, `once`, `off` (`removeListener`), `removeAllListeners` and `listenerCount`.

A filtered collection or record subscribes to its collection only while it has listeners.
Remove listeners with `off()`, or all of them with `dispose()`, when the component that listened goes away:

```js
const johns = articles.where({ author: 'John Doe' })
johns.on('data', render)
// later
johns.dispose()
```

### Collections

`luggage.collections(name)` groups collections in a folder and keeps their names in `/<name>/.meta.json`.

```js
const folders = store.collections('folders')

folders.getList()                // ['inbox', 'archive']
folders.create('drafts')         // rejects with CollectionExistsError if it is already listed
folders.getInstance('drafts')    // Collection '/folders/drafts.json'
folders.delete('drafts')
folders.readMetaProperty('owner', 'nobody')
folders.writeMetaProperty('owner', 'me')
```

`create` never overwrites a file: if `drafts.json` exists but is not listed, its data is kept.

### Writing a backend

A backend has `collection(name)` and `collections(name)`:

```js
const backend = {
  collection: name => ({
    read: () => Promise.resolve([]),          // the records; [] if the file does not exist
    write: data => Promise.resolve(data),
    delete: () => Promise.resolve()
  }),
  collections: name => ({
    readMetaInfo: () => Promise.resolve({}),  // {} if the file does not exist
    writeMetaInfo: data => Promise.resolve(data)
  })
}
```

To protect against concurrent changes, set `supportsRevisions = true` on the object returned by
`collection()`/`collections()`. Then `read`/`readMetaInfo` resolve `{ data, rev }` (`rev` is `null` when the
file does not exist), and `write(data, { rev })`/`writeMetaInfo(data, { rev })` must reject with `ConflictError`
if the file is no longer at `rev` (or exists when `rev` is `null`). Without `rev` they overwrite the file.
