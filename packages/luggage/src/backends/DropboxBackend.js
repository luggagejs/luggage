import { Dropbox } from 'dropbox'
import {
  sdkBinaryToJson,
  handleSdkDropboxError,
  handleMetaSdkDropboxError,
  genericBackend
} from './utils'

class DropboxCollection {
  constructor(name, backend) {
    this.name = name
    this.client = new Dropbox({
      accessToken: backend.token
    })
  }

  get filePath() {
    return `/${this.name}.json`
  }

  read() {
    return this.client
      .filesDownload({ path: this.filePath })
      .then(sdkBinaryToJson)
      .catch(handleSdkDropboxError)
  }

  write(data = []) {
    return this.client.filesUpload({
      contents: JSON.stringify(data),
      path: this.filePath,
      mode: 'overwrite'
    }).then(() => data)
  }

  delete() {
    return this.client.filesDelete({
      path: this.filePath
    })
  }
}

class DropboxCollections {
  constructor(name, backend) {
    this.name = name
    this.client = new Dropbox({
      accessToken: backend.token
    })
  }

  get metaFilePath() {
    return `/${this.name}/.meta.json`
  }

  readMetaInfo = () => {
    return this.client
      .filesDownload({ path: this.metaFilePath })
      .then(sdkBinaryToJson)
      .catch(handleMetaSdkDropboxError)
  }

  writeMetaInfo = data => {
    return this.client.filesUpload({
      contents: JSON.stringify(data),
      path: this.metaFilePath,
      mode: 'overwrite'
    }).then(() => data)
  }
}

export default genericBackend(DropboxCollection, DropboxCollections)
