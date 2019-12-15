import Collection from './Collection'
import Collections from './Collections'

export default class Luggage {
  constructor(backend) {
    this.backend = backend
  }

  collection(name) {
    return new Collection(name, this.backend)
  }

  collections(name) {
    return new Collections(name, this.backend)
  }
}
