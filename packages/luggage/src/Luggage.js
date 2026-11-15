import Collection from './Collection/index.js'
import Collections from './Collections/index.js'

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
