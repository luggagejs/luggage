class DummyBackendCollection {
  constructor(data) {
    this.data = data;
  }

  read() {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }

  write(data) {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
}

export default class DummyBackend {
  constructor(name, data) {
    this.collections = {
      [name]: new DummyBackendCollection(data)
    };
  }

  collection(name) {
    return this.collections.hasOwnProperty(name) ?
      this.collections[name] : new DummyBackendCollection([]);
  }
}
