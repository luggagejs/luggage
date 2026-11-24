import { Dropbox } from 'dropbox'
import { parseJson } from '../../lib/storage.js'
import { ConflictError } from '../../lib/errors.js'

// DropboxResponseError keeps the parsed response body in `error`
const errorBody = error => (error && error.error && error.error.error) || {}
const errorSummary = error => (error && error.error && error.error.error_summary) || ''

const isNotFound = error => {
  const body = errorBody(error)
  const lookup = body.path || body.path_lookup
  return Boolean(lookup && lookup['.tag'] === 'not_found')
}

const isConflict = error => {
  const body = errorBody(error)
  const reason = body.reason || (body.path && body.path.reason)
  return Boolean(reason && reason['.tag'] === 'conflict') || errorSummary(error).startsWith('path/conflict')
}

// Browsers get the file as fileBlob, Node as fileBinary (Buffer)
const fileText = result => (
  result.fileBlob
    ? result.fileBlob.text()
    : Promise.resolve(new TextDecoder('utf-8').decode(result.fileBinary))
)

// rev: undefined overwrites the file, null creates it (it must not exist),
// a string updates it only if it is still at that revision
const writeMode = rev => {
  if (typeof rev === 'undefined') {
    return { '.tag': 'overwrite' }
  }
  if (rev === null) {
    return { '.tag': 'add' }
  }
  return { '.tag': 'update', update: rev }
}

class DropboxFile {
  supportsRevisions = true

  constructor(client, path) {
    this.client = client
    this.path = path
  }

  readFile(defaultValue) {
    return this.client.filesDownload({ path: this.path })
      .then(({ result }) => fileText(result).then(text => ({
        data: parseJson(text, this.path),
        rev: result.rev
      })))
      .catch(error => {
        if (isNotFound(error)) {
          return { data: defaultValue, rev: null }
        }
        throw error
      })
  }

  writeFile(data, { rev } = {}) {
    return this.client.filesUpload({
      path: this.path,
      contents: JSON.stringify(data),
      mode: writeMode(rev),
      autorename: false,
      strict_conflict: true
    })
      .then(() => data)
      .catch(error => {
        if (isConflict(error)) {
          throw new ConflictError(this.path, error)
        }
        throw error
      })
  }

  deleteFile() {
    return this.client.filesDeleteV2({ path: this.path })
      .then(({ result }) => result)
      .catch(error => {
        if (isNotFound(error)) {
          return null
        }
        throw error
      })
  }
}

class DropboxCollection extends DropboxFile {
  read() {
    return this.readFile([])
  }

  write(data = [], options) {
    return this.writeFile(data, options)
  }

  delete() {
    return this.deleteFile()
  }
}

class DropboxCollections extends DropboxFile {
  readMetaInfo = () => this.readFile({})

  writeMetaInfo = (data, options) => this.writeFile(data, options)
}

// Takes a Dropbox client from the `dropbox` package (dropbox@10):
//   new DropboxBackend(new Dropbox({ auth }))
// A client created with DropboxAuth and a refresh token keeps the access token fresh.
// new DropboxBackend(accessToken) is a shortcut for a client with a fixed access token.
export default class DropboxBackend {
  constructor(clientOrToken) {
    if (typeof clientOrToken === 'string') {
      this.client = new Dropbox({ accessToken: clientOrToken })
    } else if (clientOrToken && typeof clientOrToken.filesDownload === 'function') {
      this.client = clientOrToken
    } else {
      throw new TypeError('DropboxBackend expects a Dropbox client or an access token')
    }
  }

  collection(name) {
    return new DropboxCollection(this.client, `/${name}.json`)
  }

  collections(name) {
    return new DropboxCollections(this.client, `/${name}/.meta.json`)
  }
}
