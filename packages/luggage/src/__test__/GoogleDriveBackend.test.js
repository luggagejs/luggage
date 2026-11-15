import { jest } from '@jest/globals'
import GoogleDriveBackend from '../backends/google-drive/index.js'

const fakeGapi = () => ({
  auth: { getToken: () => ({ access_token: 'token' }) },
  client: {
    drive: {
      files: {
        list: jest.fn(() => Promise.resolve({ result: { files: [{ id: 'id' }] } })),
        get: jest.fn(() => Promise.resolve({ result: [1] })),
        create: jest.fn(),
        delete: jest.fn()
      }
    }
  }
})

describe('GoogleDriveBackend', () => {
  let originalFetch

  beforeEach(() => {
    originalFetch = global.fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  const collection = () => new GoogleDriveBackend(fakeGapi(), { folderName: 'app' }).collection('quotes')

  it('reads a collection', async () => {
    await expect(collection().read()).resolves.toEqual([1])
  })

  it('writes a collection', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, status: 200 }))
    await expect(collection().write([1])).resolves.toEqual([1])
  })

  ;[401, 403, 500].forEach(status => {
    it(`rejects write for HTTP ${status}`, async () => {
      global.fetch = jest.fn(() => Promise.resolve({ ok: false, status }))
      await expect(collection().write([1])).rejects.toThrow(String(status))
    })
  })
})
