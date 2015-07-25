const Dummybox = {}

class Client {
  files = {}

  async(f) {
    setTimeout(f.bind(this), 0);
  }

  authenticate(options, callback) {
    this.async(callback.bind(this, null, this));
  }

  isAuthenticated() { return true }

  readFile(name, callback) {
    if (callback) this.async(callback.bind(this, null, this.files[name]))
  }

  writeFile(name, data, callback) {
    this.files[name] = data;
    if (callback) this.async(callback.bind(this, null));
  }
}

Dummybox.Client = Client;

export default Dummybox;
