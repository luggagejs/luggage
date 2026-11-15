/* eslint max-nested-callbacks: 0 */

import { TextDecoder } from 'util'
import {
  handleSdkDropboxError,
  handleMetaSdkDropboxError,
  handleDropboxError,
  sdkBinaryToJson,
  binaryToJson,
  readXMLHttp,
  writeXMLHttp,
  deleteXMLHttp
} from '../backends/utils'

const pathError = tag => ({
  error_summary: `path/${tag}/`,
  error: { '.tag': 'path', path: { '.tag': tag } }
})

// dropbox@4 SDK rejects with the response body as a JSON string
const sdkError = (tag, status = 409) => ({ status, error: JSON.stringify(pathError(tag)) })

// Browsers have TextDecoder, jsdom in jest does not
global.TextDecoder = global.TextDecoder || TextDecoder

describe('backend error handling', () => {
  describe('handleSdkDropboxError', () => {
    it('returns an empty list when the file does not exist', () => {
      expect(handleSdkDropboxError(sdkError('not_found'))).toEqual([])
    })

    it('returns empty meta when the meta file does not exist', () => {
      expect(handleMetaSdkDropboxError(sdkError('not_found'))).toEqual({})
    })

    ;['malformed_path', 'not_file', 'restricted_content', 'locked'].forEach(tag => {
      it(`rejects for path/${tag}`, () => {
        expect(() => handleSdkDropboxError(sdkError(tag))).toThrow()
      })
    })

    it('rejects for a network error instead of returning it as data', () => {
      expect(() => handleSdkDropboxError(new TypeError('Failed to fetch'))).toThrow('Failed to fetch')
    })

    it('rejects for an error body that is not JSON', () => {
      expect(() => handleSdkDropboxError({ status: 401, error: 'Error in call' })).toThrow()
    })
  })

  describe('handleDropboxError', () => {
    it('returns an empty list when the file does not exist', () => {
      expect(handleDropboxError(pathError('not_found'))).toEqual([])
    })

    it('rejects for other path errors', () => {
      expect(() => handleDropboxError(pathError('restricted_content'))).toThrow()
    })

    it('passes file data through', () => {
      expect(handleDropboxError([{ a: 1 }])).toEqual([{ a: 1 }])
    })
  })

  describe('reading file contents', () => {
    it('parses a downloaded blob', async () => {
      await expect(sdkBinaryToJson({ fileBlob: new Blob(['[1]']) })).resolves.toEqual([1])
    })

    it('rejects for a corrupted blob', async () => {
      await expect(sdkBinaryToJson({ fileBlob: new Blob(['[1,']) })).rejects.toThrow()
    })

    const streamOf = text => {
      const chunks = [new Uint8Array(Buffer.from(text))]
      return {
        content: {
          getReader: () => ({
            read: () => Promise.resolve(chunks.length ? { done: false, value: chunks.shift() } : { done: true })
          })
        }
      }
    }

    it('parses a downloaded stream', async () => {
      await expect(binaryToJson(streamOf('[1]'))).resolves.toEqual([1])
    })

    it('rejects for a corrupted stream', async () => {
      await expect(binaryToJson(streamOf('[1,'))).rejects.toThrow()
    })

    it('rejects when the stream fails', async () => {
      const data = { content: { getReader: () => ({ read: () => Promise.reject(new Error('reset')) }) } }
      await expect(binaryToJson(data)).rejects.toThrow('reset')
    })
  })

  describe('XMLHttpRequest transport', () => {
    let originalXMLHttpRequest
    let response

    beforeEach(() => {
      originalXMLHttpRequest = global.XMLHttpRequest
      global.XMLHttpRequest = class {
        open() {}
        setRequestHeader() {}
        send() {
          this.status = response.status
          this.responseText = response.body
          setTimeout(() => this.onload(), 0)
        }
      }
    })

    afterEach(() => {
      global.XMLHttpRequest = originalXMLHttpRequest
    })

    const args = { path: '/quotes.json', token: 't', apiPath: 'https://example.test' }

    it('reads file data', async () => {
      response = { status: 200, body: '[1]' }
      await expect(readXMLHttp(args)).resolves.toEqual([1])
    })

    it('reads an empty list when the file does not exist', async () => {
      response = { status: 409, body: JSON.stringify(pathError('not_found')) }
      await expect(readXMLHttp(args)).resolves.toEqual([])
    })

    it('reads the given default when the file does not exist', async () => {
      response = { status: 409, body: JSON.stringify(pathError('not_found')) }
      await expect(readXMLHttp({ ...args, defaultValue: {} })).resolves.toEqual({})
    })

    it('rejects read for other path errors', async () => {
      response = { status: 409, body: JSON.stringify(pathError('restricted_content')) }
      await expect(readXMLHttp(args)).rejects.toBeDefined()
    })

    it('rejects read for an expired token', async () => {
      response = { status: 401, body: 'Error in call to API function' }
      await expect(readXMLHttp(args)).rejects.toBeDefined()
    })

    it('rejects read for a corrupted file', async () => {
      response = { status: 200, body: '[1,' }
      await expect(readXMLHttp(args)).rejects.toBeDefined()
    })

    it('writes data', async () => {
      response = { status: 200, body: '{}' }
      await expect(writeXMLHttp({ ...args, data: [1] })).resolves.toEqual([1])
    })

    ;[401, 409, 429, 500].forEach(status => {
      it(`rejects write for HTTP ${status}`, async () => {
        response = { status, body: '{"error_summary": "error"}' }
        await expect(writeXMLHttp({ ...args, data: [1] })).rejects.toBeDefined()
      })

      it(`rejects delete for HTTP ${status}`, async () => {
        response = { status, body: 'error' }
        await expect(deleteXMLHttp(args)).rejects.toBeDefined()
      })
    })
  })
})
