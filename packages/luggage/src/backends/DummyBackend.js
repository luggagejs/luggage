class DummyBackendCollections {
  constructor(metaInfo) {
    this.metaInfo = metaInfo
  }

  readMetaInfo = () => {
    return new Promise(resolve => {
      resolve(this.metaInfo)
    })
  }

  writeMetaInfo = data => {
    return new Promise(resolve => {
      this.metaInfo = data
      resolve(data)
    })
  }
}

class DummyBackendCollection {
  constructor(data) {
    this.data = data
  }

  read() {
    return new Promise(resolve => {
      resolve(this.data)
    })
  }

  write(data) {
    return new Promise(resolve => {
      resolve(data)
    })
  }

  delete() {
    return new Promise(resolve => {
      this.data = []
      resolve(this.data)
    })
  }
}

export default class DummyBackend {
  constructor(name, data, metaInfo) {
    this.collectionMock = {
      [name]: new DummyBackendCollection(data)
    }
    this.collectionsMock = {
      [name]: new DummyBackendCollections(metaInfo)
    }
  }

  collection(name) {
    return this.collectionMock.hasOwnProperty(name) ?
      this.collectionMock[name] : new DummyBackendCollection([])
  }

  collections(name) {
    return this.collectionsMock ?
      this.collectionsMock[name] : new DummyBackendCollections()
  }
}
