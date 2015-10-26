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
    if (!callback) return;

    this.async(() => {
      if(name in this.files) {
        callback(null, this.files[name]);
      } else {
        callback({ status: Dummybox.ApiError.NOT_FOUND });
      }
    })
  }

  writeFile(name, data, callback) {
    this.files[name] = data;
    if (callback) this.async(callback.bind(this, null));
  }
}

const ApiError = {
  INVALID_TOKEN: 'INVALID_TOKEN',
  NOT_FOUND: 'NOT_FOUND',
  OVER_QUOTA: 'OVER_QUOTA',
  RATE_LIMITED: 'RATE_LIMITED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_PARAM: 'INVALID_PARAM',
  OAUTH_ERROR: 'OAUTH_ERROR',
  INVALID_METHOD: 'INVALID_METHOD'
}

Dummybox.Client = Client;
Dummybox.ApiError = ApiError;

export default Dummybox;
