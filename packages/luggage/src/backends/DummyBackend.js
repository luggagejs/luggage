// In-memory backend for tests. It behaves like a file storage:
// reads return a copy of the stored data and writes replace it.
const copy = data => (typeof data === 'undefined' ? data : JSON.parse(JSON.stringify(data)))

class DummyBackendCollections {
  constructor(metaInfo) {
    this.metaInfo = metaInfo
  }

  readMetaInfo = () => {
    return Promise.resolve(copy(this.metaInfo))
  }

  writeMetaInfo = data => {
    this.metaInfo = copy(data)
    return Promise.resolve(data)
  }
}

class DummyBackendCollection {
  constructor(data = []) {
    this.data = data
  }

  read() {
    return Promise.resolve(copy(this.data))
  }

  write(data) {
    this.data = copy(data)
    return Promise.resolve(data)
  }

  delete() {
    this.data = []
    return Promise.resolve(copy(this.data))
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
    if (!this.collectionMock.hasOwnProperty(name)) {
      this.collectionMock[name] = new DummyBackendCollection([])
    }
    return this.collectionMock[name]
  }

  collections(name) {
    if (!this.collectionsMock.hasOwnProperty(name)) {
      this.collectionsMock[name] = new DummyBackendCollections()
    }
    return this.collectionsMock[name]
  }
}
