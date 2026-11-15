import { download, putFile } from 'dropbox-client'
import { binaryToJson, handleDropboxError, handleMetaDropboxError, checkFetchResponse, genericBackend } from './utils'

class DropboxCollection {
  constructor(name, backend) {
    this.name = name
    this.token = backend.token
  }

  get filePath() {
    return `/${this.name}.json`
  }

  read() {
    return download(this.token, { path: this.filePath })
      .then(binaryToJson)
      .then(handleDropboxError)
  }

  write(data = []) {
    return putFile(
      this.token,
      JSON.stringify(data),
      'text/plain; charset=dropbox-cors-hack',
      {path: this.filePath, mode: 'overwrite'}
    )
      .then(checkFetchResponse)
      .then(() => data)
  }

  delete() {
    return Promise.resolve({ success: false})
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
    return download(this.token, { path: this.metaFilePath })
      .then(binaryToJson)
      .then(handleMetaDropboxError)
  }

  writeMetaInfo = data => {
    return putFile(
      this.token,
      JSON.stringify(data),
      'text/plain; charset=dropbox-cors-hack',
      {path: this.metaFilePath, mode: 'overwrite'}
    )
      .then(checkFetchResponse)
      .then(() => data)
  }
}

export default genericBackend(DropboxCollection, DropboxCollections)
