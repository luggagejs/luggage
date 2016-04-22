import { getFile, putFile } from 'dropbox-client'

class DropboxCollection {
  constructor(name, backend) {
    this.name = name;
    this.backend = backend;
  }

  get fileName() {
    return `${this.name}.json`;
  }

  read() {
    return new Promise((resolve, reject) => {
      this.backend.readFile(this.fileName, (error, data) => {
        if (error) {
          switch (error.status) {
            case Dropbox.ApiError.NOT_FOUND:
              resolve([]);
              break;
            default:
              reject(error);
          }
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  write(data=[]) {
    return new Promise((resolve, reject) => {
      this.backend.writeFile(this.fileName, JSON.stringify(data), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

class DropboxV1Backend {
  constructor(client) {
    this.client = client;
  }

  readFile(name, cb) {
  }

  writeFile(name, data, cb) {
  }

  collection(name) {
    return new DropboxCollection(name, this);
  }

  getToken() {
  }
}

export default DropboxV1Backend;
