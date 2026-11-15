/* eslint max-nested-callbacks: 0 */

import fetch from 'node-fetch'
import { putFile } from 'dropbox-client'
import DropboxNodeBackend from '../backends/DropboxNodeBackend'
import DropboxClientBackend from '../backends/DropboxClientBackend'

jest.mock('node-fetch', () => jest.fn())
jest.mock('dropbox-client', () => ({ download: jest.fn(), putFile: jest.fn() }))

const httpResponse = status => ({
  ok: status >= 200 && status < 300,
  status,
  text: () => Promise.resolve('error')
})

describe('DropboxNodeBackend', () => {
  const collection = new DropboxNodeBackend('token').collection('quotes')

  it('writes data', async () => {
    fetch.mockReturnValue(Promise.resolve(httpResponse(200)))
    await expect(collection.write([1])).resolves.toEqual([1])
  })

  ;[401, 409, 429].forEach(status => {
    it(`rejects write for HTTP ${status}`, async () => {
      fetch.mockReturnValue(Promise.resolve(httpResponse(status)))
      await expect(collection.write([1])).rejects.toBeDefined()
    })

    it(`rejects delete for HTTP ${status}`, async () => {
      fetch.mockReturnValue(Promise.resolve(httpResponse(status)))
      await expect(collection.delete()).rejects.toBeDefined()
    })
  })
})

describe('DropboxClientBackend', () => {
  const collection = new DropboxClientBackend('token').collection('quotes')

  it('writes data', async () => {
    putFile.mockReturnValue(Promise.resolve(httpResponse(200)))
    await expect(collection.write([1])).resolves.toEqual([1])
  })

  ;[401, 409, 429].forEach(status => {
    it(`rejects write for HTTP ${status}`, async () => {
      putFile.mockReturnValue(Promise.resolve(httpResponse(status)))
      await expect(collection.write([1])).rejects.toBeDefined()
    })
  })
})
