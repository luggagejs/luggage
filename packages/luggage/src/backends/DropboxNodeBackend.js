import fetch from 'node-fetch'
import { downloadApiPath, uploadApiPath, deleteApiPath } from './constants'
import { handleDropboxError, handleMetaDropboxError } from './utils'

const readWithFetch = ({ path, token, apiPath }) => (
  fetch(apiPath, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Dropbox-API-Arg': JSON.stringify({ path })
    }
  })
    .then(r => r.json())
)

const writeWithFetch = ({ data, path, token, apiPath }) => (
  fetch(apiPath, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      'Dropbox-API-Arg': JSON.stringify({ path }),
      'Content-Type': 'application/octet-stream'
    }
  }).then(() => data)
)

const deleteWithFetch = ({ path, token, apiPath }) => (
  fetch(apiPath, {
    method: 'post',
    body: JSON.stringify({ path }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
)

class DropboxCollection {
  constructor(name, backend) {
    this.name = name
    this.token = backend.token
  }

  get filePath() {
    return `/${this.name}.json`
  }

  read() {
    return readWithFetch({
      apiPath: downloadApiPath,
      token: this.token,
      path: this.filePath
    }).then(handleDropboxError)
  }

  write(data = []) {
    return writeWithFetch({
      data,
      apiPath: uploadApiPath,
      token: this.token,
      path: this.filePath
    })
  }

  delete() {
    return deleteWithFetch({
      apiPath: deleteApiPath,
      token: this.token,
      path: this.filePath
    })
  }
}

class DropboxCollections {
  constructor(name, backend) {
    this.name = name
    this.token = backend.token
  }

  get metaFilePath() {
    return `/${this.name}/.meta.json`
  }

  readMetaInfo = () => {
    return readWithFetch({
      apiPath: downloadApiPath,
      token: this.token,
      path: this.metaFilePath
    }).then(handleMetaDropboxError)
  }

  writeMetaInfo = data => {
    return writeWithFetch({
      data,
      apiPath: uploadApiPath,
      token: this.token,
      path: this.metaFilePath
    })
  }
}

class DropboxBackend {
  constructor(token) {
    this.token = token
  }

  collection(name) {
    return new DropboxCollection(name, this)
  }

  collections(name) {
    return new DropboxCollections(name, this)
  }
}

export default DropboxBackend
