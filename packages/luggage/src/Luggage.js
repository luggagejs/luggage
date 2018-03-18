import Collection from './Collection'

export default class Luggage {
  constructor(backend) {
    this.backend = backend
  }

  collection(name) {
    return new Collection(name, this.backend)
  }
}
