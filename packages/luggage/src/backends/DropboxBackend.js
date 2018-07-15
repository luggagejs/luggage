import { Dropbox } from 'dropbox'
import { sdkBinaryToJson, handleSdkDropboxError, genericBackend } from './utils'

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
}

export default genericBackend(DropboxCollection)
