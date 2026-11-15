import { readXMLHttp, writeXMLHttp, deleteXMLHttp } from './utils'
import { downloadApiPath, uploadApiPath, deleteApiPath } from './constants'

class DropboxCollection {
  constructor(name, backend) {
    this.name = name
    this.token = backend.token
  }

  get filePath() {
    return `/${this.name}.json`
  }

  read() {
    return readXMLHttp({
      apiPath: downloadApiPath,
      token: this.token,
      path: this.filePath
    })
  }

  write(data = []) {
    return writeXMLHttp({
      data,
      apiPath: uploadApiPath,
      token: this.token,
      path: this.filePath
    })
  }

  delete() {
    return deleteXMLHttp({
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
    return readXMLHttp({
      apiPath: downloadApiPath,
      token: this.token,
      path: this.metaFilePath,
      defaultValue: {}
    })
  }

  writeMetaInfo = data => {
    return writeXMLHttp({
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
