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

Node 22 or later. The packages are yarn workspaces and are published as ES modules without a build step.

## Releasing

All packages share one version and are released together. On an up-to-date, clean `master`:

```sh
yarn release patch        # or minor, major, or an exact version like 3.1.0
git push origin master v3.0.1
```

`yarn release` bumps the versions of all packages (and the internal `@luggage/core` dependency),
commits `Release v<version>` and creates the `v<version>` tag. `--dry-run` shows the new versions
without changing anything.

Pushing the tag starts the [Release workflow](.github/workflows/release.yml): it runs lint and tests,
checks that the tag matches the package versions and publishes `@luggage/core`, then
`@luggage/luggage-session` and `@luggage/react-luggage-redux` to npm with provenance. Versions that are
already on npm are skipped, so a failed run can be re-run.

Publishing uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers), so no npm token is stored in
the repository. One-time setup for each of the three packages on npmjs.com: Settings → Trusted publishing →
GitHub Actions, with organization `luggagejs`, repository `luggage`, workflow `release.yml` and environment `npm`.
Required reviewers on the `npm` environment (repository Settings → Environments) make every publish wait for approval.
