const createError = (name, message, props = {}) => {
  const error = new Error(message)
  error.name = name
  return Object.assign(error, props)
}

export const recordNotFoundError = collectionName => createError(
  'RecordNotFoundError',
  `Record was not found in collection "${collectionName}"`,
  { collectionName }
)

export const collectionExistsError = collectionName => createError(
  'CollectionExistsError',
  `Collection "${collectionName}" already exists`,
  { collectionName }
)

export const parseError = (path, cause) => createError(
  'ParseError',
  `Could not parse ${path || 'file'}: ${cause && cause.message}`,
  { cause }
)
