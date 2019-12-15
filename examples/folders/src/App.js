import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { lens } from 'lorgnette'
import { Luggage, DropboxBackend } from '@luggage/core'
import './App.css'

const token = "<your dropbox client token>"

const backend = new DropboxBackend(token)
const luggage = new Luggage(backend)
const collections = luggage.collections('folders test')

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

const Folders = () => {
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

function App() {
  return (
    <div className="App">
      <Folders />
    </div>
  );
}

export default App
