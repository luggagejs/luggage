class DummyBackendCollection {
  constructor(name) {
    this.name = name;
  }

  read() {
    return new Promise((reject, resolve) => {
      resolve(['dummy']);
    });
  }

  write(data) {
    return new Promise((reject, resolve) => {
      resolve(data);
    });
  }
}

class DummyBackend {
  collection(name) {
    return new DummyBackendCollection(name);
  }
}
