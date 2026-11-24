/* eslint max-nested-callbacks: 0 */
import { jest } from '@jest/globals'
import { Dropbox, DropboxResponseError } from 'dropbox'
import DropboxBackend from '../backends/dropbox/index.js'
import { ConflictError, ParseError } from '../index.js'

const responseError = (status, body) => new DropboxResponseError(status, {}, body)
const downloadError = tag => responseError(409, {
  error_summary: `path/${tag}/`,
  error: { '.tag': 'path', path: { '.tag': tag } }
})
const uploadConflict = () => responseError(409, {
  error_summary: 'path/conflict/file/',
  error: { '.tag': 'path', reason: { '.tag': 'conflict', conflict: { '.tag': 'file' } }, upload_session_id: 'x' }
})

const fakeClient = () => ({
  filesDownload: jest.fn(),
  filesUpload: jest.fn(() => Promise.resolve({ result: {} })),
  filesDeleteV2: jest.fn(() => Promise.resolve({ result: {} }))
})

describe('DropboxBackend', () => {
  let client
  let collection
  let meta

  beforeEach(() => {
    client = fakeClient()
    const backend = new DropboxBackend(client)
    collection = backend.collection('quotes')
    meta = backend.collections('books')
  })

  describe('constructor', () => {
    it('creates a client from an access token', () => {
      expect(new DropboxBackend('token').client).toBeInstanceOf(Dropbox)
    })

    it('takes a ready client', () => {
      const dropbox = new Dropbox({ accessToken: 'token' })
      expect(new DropboxBackend(dropbox).client).toBe(dropbox)
    })

    it('rejects anything else', () => {
      expect(() => new DropboxBackend()).toThrow(TypeError)
    })
  })

  describe('read', () => {
    it('reads a file downloaded in Node (fileBinary)', async () => {
      client.filesDownload.mockResolvedValue({ result: { rev: 'r1', fileBinary: Buffer.from('[1]') } })
      await expect(collection.read()).resolves.toEqual({ data: [1], rev: 'r1' })
      expect(client.filesDownload).toHaveBeenCalledWith({ path: '/quotes.json' })
    })

    it('reads a file downloaded in a browser (fileBlob)', async () => {
      client.filesDownload.mockResolvedValue({ result: { rev: 'r1', fileBlob: new Blob(['[1]']) } })
      await expect(collection.read()).resolves.toEqual({ data: [1], rev: 'r1' })
    })

    it('reads a missing file as an empty collection without revision', async () => {
      client.filesDownload.mockRejectedValue(downloadError('not_found'))
      await expect(collection.read()).resolves.toEqual({ data: [], rev: null })
    })

    it('reads missing meta as an empty object', async () => {
      client.filesDownload.mockRejectedValue(downloadError('not_found'))
      await expect(meta.readMetaInfo()).resolves.toEqual({ data: {}, rev: null })
      expect(client.filesDownload).toHaveBeenCalledWith({ path: '/books/.meta.json' })
    })

    ;['malformed_path', 'not_file', 'restricted_content', 'locked'].forEach(tag => {
      it(`rejects for path/${tag}`, async () => {
        client.filesDownload.mockRejectedValue(downloadError(tag))
        await expect(collection.read()).rejects.toBeInstanceOf(DropboxResponseError)
      })
    })

    it('rejects for an expired token', async () => {
      client.filesDownload.mockRejectedValue(responseError(401, { error_summary: 'expired_access_token/' }))
      await expect(collection.read()).rejects.toBeInstanceOf(DropboxResponseError)
    })

    it('rejects for a network error', async () => {
      client.filesDownload.mockRejectedValue(new TypeError('Failed to fetch'))
      await expect(collection.read()).rejects.toThrow('Failed to fetch')
    })

    it('rejects for a corrupted file', async () => {
      client.filesDownload.mockResolvedValue({ result: { rev: 'r1', fileBinary: Buffer.from('[1,') } })
      await expect(collection.read()).rejects.toBeInstanceOf(ParseError)
    })
  })

  describe('write', () => {
    const lastUpload = () => client.filesUpload.mock.calls[0][0]

    it('updates the file only at the revision it was read at', async () => {
      await expect(collection.write([1], { rev: 'r1' })).resolves.toEqual([1])
      expect(lastUpload()).toMatchObject({
        path: '/quotes.json',
        contents: '[1]',
        mode: { '.tag': 'update', update: 'r1' },
        strict_conflict: true
      })
    })

    it('creates a file that did not exist only if it still does not exist', async () => {
      await collection.write([1], { rev: null })
      expect(lastUpload().mode).toEqual({ '.tag': 'add' })
    })

    it('overwrites the file without a revision', async () => {
      await collection.write([1])
      expect(lastUpload().mode).toEqual({ '.tag': 'overwrite' })
    })

    it('writes meta with a revision', async () => {
      await meta.writeMetaInfo({ a: 1 }, { rev: 'r2' })
      expect(lastUpload()).toMatchObject({ path: '/books/.meta.json', mode: { '.tag': 'update', update: 'r2' } })
    })

    it('rejects with ConflictError when the file has changed', async () => {
      client.filesUpload.mockRejectedValue(uploadConflict())
      await expect(collection.write([1], { rev: 'r1' })).rejects.toBeInstanceOf(ConflictError)
    })

    ;[401, 429, 500].forEach(status => {
      it(`rejects for HTTP ${status}`, async () => {
        client.filesUpload.mockRejectedValue(responseError(status, { error_summary: 'error' }))
        await expect(collection.write([1])).rejects.toBeInstanceOf(DropboxResponseError)
      })
    })
  })

  describe('delete', () => {
    it('deletes the file', async () => {
      await collection.delete()
      expect(client.filesDeleteV2).toHaveBeenCalledWith({ path: '/quotes.json' })
    })

    it('treats a missing file as deleted', async () => {
      client.filesDeleteV2.mockRejectedValue(responseError(409, {
        error_summary: 'path_lookup/not_found/',
        error: { '.tag': 'path_lookup', path_lookup: { '.tag': 'not_found' } }
      }))
      await expect(collection.delete()).resolves.toBeNull()
    })

    it('rejects for other errors', async () => {
      client.filesDeleteV2.mockRejectedValue(responseError(401, { error_summary: 'invalid_access_token/' }))
      await expect(collection.delete()).rejects.toBeInstanceOf(DropboxResponseError)
    })
  })
})
