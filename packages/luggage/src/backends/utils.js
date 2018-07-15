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
export const handleSdkDropboxError = data => {
  if (data.error) {
    const message = JSON.parse(data.error)

    switch(message.error['.tag']) {
    case 'path':
      return []
    default:
      throw message.error
    }
  } else {
    return data
  }
}

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


export const genericBackend = Collection => {
  class DropboxBackend {
    constructor(token) {
      this.token = token
    }

    collection(name) {
      return new Collection(name, this)
    }
  }

  return DropboxBackend
}
