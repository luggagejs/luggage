class LuggageError extends Error {
  constructor(message, props = {}) {
    super(message, props.cause ? { cause: props.cause } : undefined)
    this.name = new.target.name
    Object.assign(this, props)
  }
}

// The file was changed by somebody else since it was read.
// The operation was not applied; the application decides whether to retry it.
export class ConflictError extends LuggageError {
  constructor(path, cause) {
    super(`${path} was changed by somebody else`, { path, cause })
  }
}

export class RecordNotFoundError extends LuggageError {
  constructor(collectionName) {
    super(`Record was not found in collection "${collectionName}"`, { collectionName })
  }
}

export class CollectionExistsError extends LuggageError {
  constructor(collectionName) {
    super(`Collection "${collectionName}" already exists`, { collectionName })
  }
}

export class ParseError extends LuggageError {
  constructor(path, cause) {
    super(`Could not parse ${path || 'file'}: ${cause && cause.message}`, { path, cause })
  }
}
