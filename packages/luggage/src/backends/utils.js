/* eslint no-shadow: 0 */

import { parseError } from '../lib/errors'

const parseJson = (text, path) => {
  try {
    return JSON.parse(text)
  } catch (error) {
    throw parseError(path, error)
  }
}

const parseJsonOrText = text => {
  try {
    return JSON.parse(text)
  } catch (error) {
    return text
  }
}

const isOk = status => status >= 200 && status < 300

// Only a missing file means an empty collection. Every other error
// (malformed_path, restricted_content, locked, ...) must reach the caller,
// otherwise the next write would replace the whole file.
export const isNotFoundError = error => Boolean(
  error &&
  error['.tag'] === 'path' &&
  error.path &&
  error.path['.tag'] === 'not_found'
)

const httpError = (status, body) => {
  const parsed = parseJsonOrText(body)
  const error = new Error(
    `Dropbox request failed with HTTP ${status}: ${(parsed && parsed.error_summary) || body}`
  )
  error.status = status
  error.error = parsed && parsed.error ? parsed.error : parsed
  return error
}

const sendXMLHttp = ({ apiPath, headers, body, onLoad }) => (
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.onload = () => {
      try {
        resolve(onLoad(request))
      } catch (error) {
        reject(error)
      }
    }
    request.ontimeout = () => {
      reject(httpError(request.status, request.responseText))
    }
    request.onerror = () => {
      reject(httpError(request.status, request.responseText))
    }
    request.open('POST', apiPath)
    Object.keys(headers).forEach(name => request.setRequestHeader(name, headers[name]))
    request.send(body)
  })
)

export const readXMLHttp = ({ path, token, apiPath, defaultValue = [] }) => (
  sendXMLHttp({
    apiPath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Dropbox-API-Arg': JSON.stringify({ path })
    },
    onLoad: request => {
      if (isOk(request.status)) {
        return parseJson(request.responseText, path)
      }

      const error = httpError(request.status, request.responseText)

      if (request.status === 409 && isNotFoundError(error.error)) {
        return defaultValue
      }

      throw error
    }
  })
)


export const writeXMLHttp = ({ data, path, token, apiPath }) => (
  sendXMLHttp({
    apiPath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Dropbox-API-Arg': JSON.stringify({ path, mode: 'overwrite' }),
      'Content-Type': 'application/octet-stream'
    },
    body: JSON.stringify(data),
    onLoad: request => {
      if (!isOk(request.status)) {
        throw httpError(request.status, request.responseText)
      }
      return data
    }
  })
)


export const deleteXMLHttp = ({ path, token, apiPath }) => (
  sendXMLHttp({
    apiPath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ path }),
    onLoad: request => {
      if (!isOk(request.status)) {
        throw httpError(request.status, request.responseText)
      }
      return parseJsonOrText(request.responseText)
    }
  })
)


// Rejects for any non-2xx fetch response
export const checkFetchResponse = response => {
  if (response.ok) {
    return response
  }

  return response.text().then(body => {
    throw httpError(response.status, body)
  })
}


export const sdkBinaryToJson = data => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = e => {
      try {
        resolve(parseJson(e.target.result, data.name || data.path_display))
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => {
      reject(reader.error)
    }

    reader.readAsText(data.fileBlob)
  })
}


export const binaryToJson = data => {
  return new Promise((resolve, reject) => {
    const reader = data.content.getReader()
    let result = new Uint8Array()

    reader.read().then(function processText({ done, value }) {
      if (done) {
        const jsonString = new TextDecoder('utf-8').decode(result)
        return resolve(parseJson(jsonString, data.metadata && data.metadata.path_display))
      }

      const tmpValue = new Uint8Array(result.length + value.length)
      tmpValue.set(result)
      tmpValue.set(value, result.length)

      result = tmpValue

      return reader.read().then(processText)
    }).catch(reject)
  })
}


// dropbox@4 rejects with the response body as a string
// https://github.com/dropbox/dropbox-sdk-js/issues/145
const sdkErrorBody = rejection => {
  if (!rejection || typeof rejection.error === 'undefined') {
    return null
  }

  const body = typeof rejection.error === 'string'
    ? parseJsonOrText(rejection.error)
    : rejection.error

  return body && body.error ? body.error : body
}

const handleSdkDropboxErrorWith = defaultValue => rejection => {
  const error = sdkErrorBody(rejection)

  if (isNotFoundError(error)) {
    return defaultValue
  }

  if (error && typeof error === 'object') {
    throw error
  }

  throw rejection
}


export const handleSdkDropboxError = handleSdkDropboxErrorWith([])
export const handleMetaSdkDropboxError = handleSdkDropboxErrorWith({})


// For transports that resolve with the response body even for errors
const handleDropboxErrorWith = defaultValue => data => {
  if (data && data.error) {
    if (isNotFoundError(data.error)) {
      return defaultValue
    }
    throw data.error
  }

  return data
}


export const handleDropboxError = handleDropboxErrorWith([])
export const handleMetaDropboxError = handleDropboxErrorWith({})


export const genericBackend = (Collection, Collections) => {
  class DropboxBackend {
    constructor(token) {
      this.token = token
    }

    collection(name) {
      return new Collection(name, this)
    }

    collections(name) {
      return new Collections(name, this)
    }
  }

  return DropboxBackend
}


// Google Drive utilities

const initGoogleDriveAPIClient = config =>
  new Promise(resolve =>
    global.gapi.load('client:auth2', () => {
      global.location.hash = global.initialHash
      global.gapi.client
        .init(config)
        .then(resolve)
    })
  )


export const getAPIClient = (() => {
  let isInited = false
  let isIniting = false
  const afterInitCallbacks = []

  return config => {
    return new Promise(resolve => {
      if (isInited) {
        resolve(global.gapi)
      } else if (global.gapi && !isIniting) {
        isIniting = true
        initGoogleDriveAPIClient(config).then(() => {
          isInited = true
          afterInitCallbacks.forEach(callback => callback(global.gapi))
          resolve(global.gapi)
        })
      } else {
        afterInitCallbacks.push(resolve)
      }
    })
  }
})()


export const handleSignIn = (gapi, callback) => {
  gapi.auth2.getAuthInstance().isSignedIn.listen(callback)
  callback(gapi.auth2.getAuthInstance().isSignedIn.get())
}


const createFolder = (gapi, folderName) => (
  gapi.client.drive.files.create({
    resource: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id'
  })
)


const createFolderWithParent = (gapi, folderName, parentId) => (
  gapi.client.drive.files.create({
    resource: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId]
    },
    fields: 'id'
  })
)


export const findOrCreateFolder = (gapi, folderName) => (
  gapi.client.drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive'
  }).then(({ result }) => {
    return result.files.length === 0
      ? createFolder(gapi, folderName).then(({ result }) => ({ id: result.id, name: folderName }))
      : result.files[0]
  })
)


export const findOrCreateFolderWithParent = (gapi, folderName, parentId) => (
  gapi.client.drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder'
      and name='${folderName}'
      and trashed=false
      and '${parentId}' in parents`,
    fields: 'files(id, name)',
    spaces: 'drive'
  }).then(({ result }) => {
    return result.files.length === 0
      ? createFolderWithParent(gapi, folderName, parentId).then(({ result }) => ({ id: result.id, name: folderName }))
      : result.files[0]
  })
)


export const fileIdByNameAndParent = (gapi, name, parentId) =>
  new Promise((resolve, reject) => {
    gapi.client.drive.files.list({
      pageSize: 1,
      fields: 'files(id)',
      q: `'${parentId}' in parents and trashed = false and name = '${name}'`
    })
      .then(response =>
        resolve(response.result.files.length > 0 ? response.result.files[0].id : null)
      )
      .catch(reject)
  })


const updateFile = (gapi, fileId, contents) => (
  fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${gapi.auth.getToken().access_token}`
    },
    body: contents
  })
)


export const createFile = (gapi, name, parentId, contents) => (
  new Promise((resolve, reject) => {
    fileIdByNameAndParent(gapi, name, parentId)
      .then(fileId =>
        fileId
          ? updateFile(gapi, fileId, contents).then(resolve).catch(reject)
          : gapi.client.drive.files
            .create({
              name,
              parents: [parentId]
            })
            .then(response => updateFile(gapi, response.result.id, contents))
            .then(resolve)
            .catch(reject)
      )
      .catch(reject)
  })
)
