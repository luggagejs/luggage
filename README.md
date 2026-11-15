# luggage
[![CI](https://github.com/luggagejs/luggage/actions/workflows/ci.yml/badge.svg)](https://github.com/luggagejs/luggage/actions/workflows/ci.yml)

Dropbox and Google Drive file API wrapper for storing json data.

> Have you ever noticed that their stuff is shit and your shit is stuff?
(George Carlin)

```js
import { Luggage } from '@luggage/core'
import { DropboxBackend } from '@luggage/core/dropbox'

const store = new Luggage(new DropboxBackend(token))
const articles = store.collection('articles')

articles.add({ id: 1, author: 'John Doe' })
articles.find({ id: 1 }).update({ author: 'Jane Doe' })
```

## Packages

| Package                                                        | What it is                                                |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| [`@luggage/core`](packages/luggage)                            | collections, records and the Dropbox/Google Drive backends |
| [`@luggage/luggage-session`](packages/luggage-session)         | Dropbox sign in in the browser (OAuth 2 with PKCE)        |
| [`@luggage/react-luggage-redux`](packages/react-luggage-redux) | redux middleware and reducer                              |

Upgrading from 2.x? See the [migration guide](MIGRATION.md).

## Development

```sh
yarn install
yarn test
yarn lint
```

Node 20 or later. The packages are yarn workspaces and are published as ES modules without a build step.
