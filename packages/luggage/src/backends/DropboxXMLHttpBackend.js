import { readXMLHttp, writeXMLHttp, deleteXMLHttp } from './utils'

const downloadApiPath = 'https://content.dropboxapi.com/2/files/download'
const uploadApiPath = 'https://content.dropboxapi.com/2/files/upload'
const deleteApiPath = 'https://api.dropboxapi.com/2/files/delete_v2'

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
      path: this.metaFilePath
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
