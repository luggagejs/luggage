/* eslint no-shadow: 0 */

export const readXMLHttp = ({ path, token, apiPath }) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.onload = () => {
      const data = JSON.parse(request.responseText)

      if (data.error) {
        if (data.error['.tag'] === 'path') {
          resolve([])
        } else {
          reject(data.error)
        }
      } else {
        resolve(data)
      }
    }

    request.ontimeout = () => {
      reject(request.responseText)
    }
    request.onerror = () => {
      reject(request.responseText)
    }
    request.open('POST', apiPath)
    request.setRequestHeader('Authorization', `Bearer ${token}`)
    request.setRequestHeader('Dropbox-API-Arg', JSON.stringify({ path }))
    request.send()
  })
}


export const writeXMLHttp = ({ data, path, token, apiPath }) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.onload = () => {
      const response = request.responseText
      if (response.error) {
        reject(response.error)
      } else {
        resolve(data)
      }
    }

    request.ontimeout = () => {
      reject(request.responseText)
    }
    request.onerror = () => {
      reject(request.responseText)
    }
    request.open('POST', apiPath)
    request.setRequestHeader('Authorization', `Bearer ${token}`)
    request.setRequestHeader('Dropbox-API-Arg', JSON.stringify({ path, mode: 'overwrite' }))
    request.setRequestHeader('Content-Type', 'application/octet-stream')
    request.send(JSON.stringify(data))
  })
}


export const deleteXMLHttp = ({ path, token, apiPath }) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.onload = () => {
      const response = request.responseText
      if (response.error) {
        reject(response.error)
      } else {
        resolve(response)
      }
    }

    request.ontimeout = () => {
      reject(request.responseText)
    }
    request.onerror = () => {
      reject(request.responseText)
    }
    request.open('POST', apiPath)
    request.setRequestHeader('Authorization', `Bearer ${token}`)
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify({ path }))
  })
}


export const sdkBinaryToJson = data => {
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = e => {
      resolve(JSON.parse(e.target.result))
    }

    reader.readAsText(data.fileBlob)
  })
}


export const binaryToJson = data => {
  return new Promise(resolve => {
    const reader = data.content.getReader()
    let result = new Uint8Array()

    reader.read().then(function processText({ done, value }) {
      if (done) {
        const jsonString = new TextDecoder('utf-8').decode(result)
        return resolve(JSON.parse(jsonString))
      }

      const tmpValue = new Uint8Array(result.length + value.length)
      tmpValue.set(result)
      tmpValue.set(value, result.length)

      result = tmpValue

      return reader.read().then(processText)
    })
  })
}


// Error is a string but this may change
// https://github.com/dropbox/dropbox-sdk-js/issues/145
const handleSdkDropboxErrorWith = defaultValue => data => {
  if (data.error) {
    const message = JSON.parse(data.error)

    switch(message.error['.tag']) {
    case 'path':
      return defaultValue
    default:
      throw message.error
    }
  } else {
    return data
  }
}


export const handleSdkDropboxError = handleSdkDropboxErrorWith([])
export const handleMetaSdkDropboxError = handleSdkDropboxErrorWith({})


export const handleDropboxError = data => {
  if (data.error) {
    switch(data.error['.tag']) {
    case 'path':
      return []
    default:
      throw data.error
    }
  } else {
    return data
  }
}


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
