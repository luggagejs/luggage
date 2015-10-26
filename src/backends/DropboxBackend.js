/* global Dropbox */

import delegate from "../lib/delegate";

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
      this.backend.writeFile(this.fileName, JSON.stringify(data), (error, stat) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

class DropboxBackend {
  constructor(client) {
    this.client = client;

    delegate(this, "readFile", this.client);
    delegate(this, "writeFile", this.client);
  }

  collection(name) {
    return new DropboxCollection(name, this);
  }
}

export default DropboxBackend;
