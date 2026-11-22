# Luggage session manager

Signs the user in to Dropbox in the browser with the OAuth 2 code flow and PKCE,
and gives you a Dropbox client for [`@luggage/core`](../luggage).

```sh
yarn add @luggage/luggage-session dropbox
```

### Usage

```js
import SessionManager from '@luggage/luggage-session'
import { Luggage } from '@luggage/core'
import { DropboxBackend } from '@luggage/core/dropbox'

const session = new SessionManager({ clientId: 'dropbox-app-key', redirectUrl: '/app' })

// Resolves true when the user is signed in.
// Otherwise redirects to Dropbox and resolves false; after the user comes back
// to /app with ?code=..., the next authenticate() finishes the sign in.
if (await session.authenticate()) {
  const store = new Luggage(new DropboxBackend(session.getClient()))
}
```

Add the full redirect url (for example `https://example.com/app`) to the redirect URIs of your Dropbox app.

The refresh token is kept in `sessionStorage`, so the user signs in again in a new tab.
Pass `storage: localStorage` to keep the session between visits. The client returned by `getClient()`
refreshes the short-lived access token by itself.

`session.signOut()` forgets the refresh token.

`authenticate()` rejects when the sign in fails: the user denied access on the Dropbox page, or the code
from the redirect could not be exchanged. The failed answer is removed from the url, so the next
`authenticate()` starts a new sign in. A stored refresh token is checked on every `authenticate()` that
needs a new access token; when Dropbox says it is revoked or expired, it is forgotten and the user is sent
to sign in again. If the check fails for another reason (no network), `authenticate()` rejects and the
token is kept.

| Option        | Default          |                                        |
| ------------- | ---------------- | -------------------------------------- |
| `clientId`    | required         | Dropbox app key                        |
| `redirectUrl` | `'/'`            | path Dropbox redirects back to         |
| `storage`     | `sessionStorage` | where the refresh token is kept        |
