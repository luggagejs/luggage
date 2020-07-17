import React, { useEffect, useCallback, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { lens } from 'lorgnette'
import { Luggage, GoogleDriveBackend } from '@luggage/core'
import * as utils from '@luggage/core/src/backends/utils'
import './App.css'

const CLIENT_ID = '652410950137-l38bfpdgd0n7ugipjf88jguf8j0r3q03.apps.googleusercontent.com'
const API_KEY = 'AIzaSyDUYXTCp7W9o3pBI3TRjp5bq0FL95bcr2A'
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
const SCOPES = 'https://www.googleapis.com/auth/drive'

const config = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES
}

const Files = ({ content }) => (
  content.map((value, i) => <div key={value + i}>{ value }</div>)
)

Files.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string),
}

const Folder = ({ name, content, deleteFolderHandler, addFileHandler }) => {
  const addFileEl = useRef(null);

  const addFileLocalHandler = useCallback(() => {
    const fileName = addFileEl.current.value

    if (fileName && fileName.length > 0) {
      addFileHandler(name, fileName)
      addFileEl.current.value = ''
    }
  }, [name, addFileHandler])

  return (
    <div>
      <strong>
        { name }
      </strong>
      <span className='delete' onClick={() => deleteFolderHandler(name)}>Delete Folder</span>
      <div>
        <input placeholder='Add File' ref={addFileEl} />
        <button onClick={addFileLocalHandler}>Add File</button>
      </div>
      <Files content={content} />
    </div>
  )
}

Folder.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string),
  deleteFolderHandler: PropTypes.func.isRequired,
  addFileHandler: PropTypes.func.isRequired
}

Folder.defaultProps = {
  content: []
}

const Folders = ({ collections }) => {
  const [colls, setColls] = useState([])

  useEffect(() => {
    collections.getList().then(names => {
      Promise.all(names.map(name => (
        collections.getInstance(name).read()
          .then(content => ({ name, content }))
      ))).then(setColls)
    })
  }, [])

  const addFolderEl = useRef(null);

  const addFolderHandler = useCallback(() => {
    const name = addFolderEl.current.value

    if (name && name.length > 0) {
      collections.create(name)
        .then(() => { setColls([...colls, { name }]) })

      addFolderEl.current.value = ''
    }
  }, [setColls, colls])

  const deleteFolderHandler = useCallback(name => {
    collections.delete(name)
      .then(() => { setColls(colls.filter(coll => coll.name !== name )) })
  }, [setColls, colls])

  const addFileHandler = useCallback((collName, value) => {
    const l = lens
      .firstOf(({ name }) => name === collName)
      .prop('content', [])
      .last()

    collections.getInstance(collName)
      .add(value)
      .then(([_, data]) => {
        setColls(l.set(colls, value))
      })
  }, [setColls, colls])

  return (
    <>
      <input placeholder='Add Folder' ref={addFolderEl} />
      <button onClick={addFolderHandler}>Add Folder</button>

      { colls.map(({ name, content }) => (
        <Folder
          key={name}
          deleteFolderHandler={deleteFolderHandler}
          addFileHandler={addFileHandler}
          content={content}
          name={name}
        />
      )) }
    </>
  )
}

const App = () => {
  const [isSignedIn, setSignedIn] = useState(false)
  const [collections, setCollections] = useState(null)

  const handleAuth = useCallback(() => {
    global.gapi.auth2.getAuthInstance().signIn()
  }, [])

  const handleSignout = useCallback(() => {
    global.gapi.auth2.getAuthInstance().signOut()
  }, [])

  useEffect(() => {
    utils.getAPIClient(config).then(gapi => {
      utils.handleSignIn(gapi, isSignedIn => {
        if (isSignedIn) {
          const luggage = new Luggage(new GoogleDriveBackend(gapi, { folderName: 'FoldersTestExample' }))
          setCollections(luggage.collections('folders test'))
          setSignedIn(true)
        } else {
          setSignedIn(false)
        }
      })
    })
  }, [])

  return (
    <div className="App">
      { isSignedIn
        ? <>
            <Folders collections={collections} />
            <button onClick={handleSignout}>Sign Out</button>
          </>
        : <button onClick={handleAuth}>Authorize</button>
      }
    </div>
  )
}

export default App
