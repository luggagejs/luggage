/* eslint max-nested-callbacks: 0 */
import { jest } from '@jest/globals'
import { Dropbox } from 'dropbox'
import { Luggage, ConflictError } from '../index.js'
import DropboxBackend from '../backends/dropbox/index.js'

// Runs DropboxBackend through the real dropbox SDK; only fetch is replaced
const jsonResponse = (status, body, headers = {}) => new Response(
  typeof body === 'string' ? body : JSON.stringify(body),
  { status, headers: { 'content-type': 'application/json', ...headers } }
)

describe('DropboxBackend with the dropbox SDK', () => {
  let fetch
  let luggage

  beforeEach(() => {
    fetch = jest.fn()
    luggage = new Luggage(new DropboxBackend(new Dropbox({ accessToken: 'token', fetch })))
  })

  const download = (content, rev) => new Response(content, {
    status: 200,
    headers: {
      'content-type': 'application/octet-stream',
      'dropbox-api-result': JSON.stringify({ name: 'quotes.json', rev })
    }
  })

  const notFound = () => jsonResponse(409, {
    error_summary: 'path/not_found/..',
    error: { '.tag': 'path', path: { '.tag': 'not_found' } }
  })

  it('reads a collection', async () => {
    fetch.mockResolvedValue(download('[{"quote":"a"}]', 'r1'))
    await expect(luggage.collection('quotes').read()).resolves.toEqual([{ quote: 'a' }])
  })

  it('reads a missing file as an empty collection', async () => {
    fetch.mockResolvedValue(notFound())
    await expect(luggage.collection('quotes').read()).resolves.toEqual([])
  })

  it('rejects other path errors', async () => {
    fetch.mockResolvedValue(jsonResponse(409, {
      error_summary: 'path/restricted_content/',
      error: { '.tag': 'path', path: { '.tag': 'restricted_content' } }
    }))
    await expect(luggage.collection('quotes').read()).rejects.toMatchObject({ status: 409 })
  })

  it('adds with the revision it read', async () => {
    fetch
      .mockResolvedValueOnce(download('[]', 'r1'))
      .mockResolvedValueOnce(jsonResponse(200, { rev: 'r2' }))

    await luggage.collection('quotes').add({ quote: 'b' })
    const arg = JSON.parse(fetch.mock.calls[1][1].headers['Dropbox-API-Arg'])
    expect(arg).toMatchObject({ path: '/quotes.json', mode: { '.tag': 'update', update: 'r1' } })
  })

  it('creates a missing file in add mode', async () => {
    fetch
      .mockResolvedValueOnce(notFound())
      .mockResolvedValueOnce(jsonResponse(200, { rev: 'r1' }))

    await luggage.collection('quotes').add({ quote: 'b' })
    const arg = JSON.parse(fetch.mock.calls[1][1].headers['Dropbox-API-Arg'])
    expect(arg.mode).toEqual({ '.tag': 'add' })
  })

  it('rejects with ConflictError when the upload conflicts', async () => {
    fetch
      .mockResolvedValueOnce(download('[]', 'r1'))
      .mockResolvedValueOnce(jsonResponse(409, {
        error_summary: 'path/conflict/file/..',
        error: { '.tag': 'path', reason: { '.tag': 'conflict', conflict: { '.tag': 'file' } }, upload_session_id: 'x' }
      }))

    await expect(luggage.collection('quotes').add({ quote: 'b' })).rejects.toBeInstanceOf(ConflictError)
  })
})
