# Luggage session manager
[![build status](https://img.shields.io/travis/luggagejs/luggage-session/master.svg?style=flat-square)](https://travis-ci.org/luggagejs/luggage-session)

Utils for fetching and storing dropbox authentication token.

### Usage

```js
import LuggageSession from 'luggage-session'

const session = new LuggageSession({ apiKey: 'dropboxApiKey', redirectUrl: '/app'})

// If token already exists in memory or sessionStorage you will get it
// otherwise this will cause a redirect to dropbox authentication page
const token = session.getToken()
```
