import { EventEmitter } from 'events';

class BaseCollection extends EventEmitter {
  constructor(name, client) {
    super();

    this.client = client;
    this.name = name;
  }

  get fileName() { return `${this.name}.json` }

  write(data=[]) {
    return new Promise((resolve, reject) => {
      this.client.writeFile(this.fileName, JSON.stringify(data), (error, stat) => {
        error ? reject(error) : resolve(stat);
      });
    })
  }

  read() {
    return new Promise((resolve, reject) => {
      this.client.readFile(this.fileName, (error, data) => {
        switch (error) {
          case undefined:
          case null:
            resolve(JSON.parse(data));
            break;
          case Dropbox.ApiError.NOT_FOUND:
            this.write().then(() => resolve([]));
            break;
          default:
            reject(error)
        }
      })
    })
  }
}

export default BaseCollection;
