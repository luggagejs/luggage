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
      } else {
        if (global.gapi && !isIniting) {
          isIniting = true;
          initGoogleDriveAPIClient(config).then(() => {
            isInited = true;
            afterInitCallbacks.forEach(callback => callback(global.gapi))
            resolve(global.gapi)
          })
        } else {
          afterInitCallbacks.push(resolve)
        }
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
  }).catch(({ result }) => {
    console.log(result.error)
  })
)

export const findOrCreateFolderWithParent = (gapi, folderName, parentId) => (
  gapi.client.drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder'
      and name='${folderName}'
      and trashed=false and '${parentId}' in parents`,
    fields: 'files(id, name)',
    spaces: 'drive'
  }).then(({ result }) => {
    return result.files.length === 0
      ? createFolderWithParent(gapi, folderName, parentId).then(({ result }) => ({ id: result.id, name: folderName }))
      : result.files[0]
  }).catch(({ result }) => {
    console.log(result.error)
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
      Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
    },
    body: contents
  })
)

export const createFile = (gapi, name, parentId, contents) => (
  new Promise((resolve, reject) => {
    fileIdByNameAndParent(gapi, name, parentId)
      .then(fileId =>
        !!fileId
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