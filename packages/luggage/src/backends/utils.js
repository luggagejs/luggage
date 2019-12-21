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
    request.setRequestHeader('Content-Type', 'text/plain; charset=dropbox-cors-hack')
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
    request.setRequestHeader('Dropbox-API-Arg', JSON.stringify({ path }))
    request.send()
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
