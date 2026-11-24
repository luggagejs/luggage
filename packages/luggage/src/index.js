// Backends have their own entry points, so that an application bundles only the one it uses:
//   @luggage/core/dropbox, @luggage/core/google-drive, @luggage/core/dummy
export { default } from './Luggage.js'
export { default as Luggage } from './Luggage.js'
export { default as Collection } from './Collection/index.js'
export { default as Collections, metaProperties } from './Collections/index.js'
export {
  ConflictError,
  RecordNotFoundError,
  CollectionExistsError,
  ParseError
} from './lib/errors.js'
