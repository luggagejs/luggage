import Filterable from './traits/Filterable';
import Record from './Record';

class Collection extends Filterable {
  constructor(name, client) {
    super();

    this.client = client;
    this.name = name;
  }

  get fileName() { return `${this.name}.json` }

  read() {
    return new Promise((resolve, reject) => {
      this.client.readFile(this.fileName, (error, data) => {
        switch (error) {
          case undefined:
          case null:
            resolve(JSON.parse(data));
            break;
          case Dropbox.ApiError.NOT_FOUND:
            resolve([]);
            break;
          default:
            reject(error)
        }
      })
    })
  }

  write(data=[]) {
    return new Promise((resolve, reject) => {
      this.client.writeFile(this.fileName, JSON.stringify(data), (error, stat) => {
        if (error) {
          reject(error);
        } else {
          resolve(stat);
        }
      });
    })
  }
}

export default Collection
