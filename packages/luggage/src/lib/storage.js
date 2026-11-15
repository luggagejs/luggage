import { ParseError } from './errors.js'

export const parseJson = (text, path) => {
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new ParseError(path, error)
  }
}

// Backends that support revisions return { data, rev } from read() and accept
// { rev } in write(). Other backends return the data itself.
// rev === null means that the file does not exist yet.
export const readSnapshot = (backend, read) => (
  read().then(result => (
    backend.supportsRevisions ? result : { data: result, rev: undefined }
  ))
)
