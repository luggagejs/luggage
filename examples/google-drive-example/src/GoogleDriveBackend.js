/* eslint no-shadow: 0 */
/* eslint max-nested-callbacks: 0 */

import {
  findOrCreateFolder,
  findOrCreateFolderWithParent,
  createFile,
  fileIdByNameAndParent
} from './driveUtils'

class GoogleDriveCollection {
  constructor(name, backend) {
    this.name = name
    this.config = backend.config
    this.gapi = backend.gapi

    if (this.name.includes('/')) {
      const [folderName, fileName] = this.name.split('/')

      this.folderName = folderName
      this.fileName = `${fileName}.json`
    } else {
      this.fileName = `${this.name}.json`
    }
  }

  read() {
    return findOrCreateFolder(this.gapi, this.config.folderName)
      .then(({ id }) => (
        this.folderName
          ? findOrCreateFolderWithParent(this.gapi, this.folderName, id)
          : { id }
      ))
      .then(({ id }) => (
        fileIdByNameAndParent(this.gapi, this.fileName, id).then(fileId => (
          fileId
            ? this.gapi.client.drive.files
              .get({
                fileId,
                alt: 'media'
              })
              .then(({ result }) => result)
              .catch(error => {
                if (error.body && JSON.parse(error.body).error.errors[0].reason === 'notFound') {
                  return []
                }
                throw error
              })
            : []
        ))
      ))
  }

  write(data = []) {
    return findOrCreateFolder(this.gapi, this.config.folderName)
      .then(({ id }) => (
        this.folderName
          ? findOrCreateFolderWithParent(this.gapi, this.folderName, id)
          : { id }
      ))
      .then(({ id }) => createFile(this.gapi, this.fileName, id, JSON.stringify(data)))
      .then(() => data)
  }

  delete() {
    return findOrCreateFolder(this.gapi, this.config.folderName)
      .then(({ id }) => (
        this.folderName
          ? findOrCreateFolderWithParent(this.gapi, this.folderName, id)
            .then(({ id }) => fileIdByNameAndParent(this.gapi, this.fileName, id))
          : fileIdByNameAndParent(this.gapi, this.fileName, id))
      )
      .then(fileId => (
        !!fileId && this.gapi.client.drive.files.delete({ fileId })
      ))
  }
}

class GoogleDriveCollections {
  constructor(name, backend) {
    this.name = name
    this.config = backend.config
    this.gapi = backend.gapi
  }

  get metaFileName() {
    return '.meta.json'
  }

  get metaFolderName() {
    return this.name
  }

  readMetaInfo = () => {
    return findOrCreateFolder(this.gapi, this.config.folderName)
      .then(({ id }) => findOrCreateFolderWithParent(this.gapi, this.metaFolderName, id)
        .then(({ id }) => fileIdByNameAndParent(this.gapi, this.metaFileName, id)
          .then(fileId => (
            fileId
              ? this.gapi.client.drive.files
                .get({ fileId, alt: 'media' })
                .then(({ result }) => result)
                .catch(error => {
                  if (error.body && JSON.parse(error.body).error.errors[0].reason === 'notFound') {
                    return {}
                  }

                  throw error
                })
              : {}
          ))
        ))
  }

  writeMetaInfo = data => {
    return findOrCreateFolder(this.gapi, this.config.folderName)
      .then(({ id }) => findOrCreateFolderWithParent(this.gapi, this.name, id))
      .then(({ id }) => createFile(this.gapi, this.metaFileName, id, JSON.stringify(data)))
      .then(() => data)
  }
}

const genericBackend = (Collection, Collections) => (
  class {
    constructor(gapi, config) {
      this.config = config
      this.gapi = gapi
    }

    collection(name) {
      return new Collection(name, this)
    }

    collections(name) {
      return new Collections(name, this)
    }
  }
)

export default genericBackend(GoogleDriveCollection, GoogleDriveCollections)
