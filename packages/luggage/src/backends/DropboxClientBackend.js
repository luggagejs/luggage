import { download, putFile } from 'dropbox-client'
import { binaryToJson, handleDropboxError, genericBackend } from './utils'

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
    ).then(() => data)
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
      .then(handleDropboxError)
  }

  writeMetaInfo = data => {
    return putFile(
      this.token,
      JSON.stringify(data),
      'text/plain; charset=dropbox-cors-hack',
      {path: this.metaFilePath, mode: 'overwrite'}
    ).then(() => data)
  }
}

export default genericBackend(DropboxCollection, DropboxCollections)
