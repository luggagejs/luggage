import Collection from './Collection';

export default class Luggage {
  constructor(client) {
    this.client = client;
  }

  collection(name) {
    return new Collection(name);
  }
}
