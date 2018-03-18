/* eslint max-nested-callbacks: 0 */

import DropboxBackend from '../backends/DummyBackend'
import Collection from '../Collection'

describe('Record', () => {
  let record
  let quotes

  beforeEach(() => {
    quotes = [
      { quote: 'hey' },
      { quote: 'you', author: 'unknown' },
      { quote: 'get', author: 'John Doe' },
      { book: 'Hey you', author: 'John Doe' },
      { bla: 'blah blah blah mr. Freeman' }
    ]

    const backend = new DropboxBackend('quotes', quotes)
    const collection = new Collection('quotes', backend)

    record = collection.find({ quote: 'get' })
  })

  describe('Record#read', () => {
    it('returns record as a Promise', async () => {
      const data = await record.read()
      expect(data).toEqual({ quote: 'get', author: 'John Doe' })
    })
  })

  describe('Record#update', () => {
    it('writes new data to json file', async () => {
      await record.update(r => {
        r.quote = 'get it done'
        return r
      })
      const fileData = quotes
      const fileRecord = fileData.find(({quote}) => quote === 'get it done')
      expect(fileRecord).toEqual({ quote: 'get it done', author: 'John Doe' })
    })

    it('returns Promise with new data', async () => {
      const [newRecord, oldRecord, data] = await record.update(r => {
        r.quote = 'get it done'
        return r
      })

      expect(newRecord).toEqual({ quote: 'get it done', author: 'John Doe' })
      expect(oldRecord).toEqual({ quote: 'get', author: 'John Doe' })
      expect(data).toContainEqual({ quote: 'get it done', author: 'John Doe' })
      expect(data).not.toContainEqual({ quote: 'get', author: 'John Doe' })
    })

    it('takes an object as part of an update', async () => {
      const [r] = await record.update({
        quote: 'get it done',
        famous: true
      })
      expect(r).toEqual({ quote: 'get it done', author: 'John Doe', famous: true })
    })
  })

  describe('Record#delete', () => {
    it('writes new data to json file', async () => {
      await record.delete()
      const fileData = quotes
      expect(fileData).not.toContainEqual({ quote: 'get', author: 'John Doe' })
    })

    it('returns Promise with new data', async () => {
      const [r, data] = await record.delete()
      expect(r).toEqual({ quote: 'get', author: 'John Doe' })
      expect(data).not.toContainEqual({ quote: 'get', author: 'John Doe' })
    })
  })

  describe('Record as EventEmitter', () => {
    it('emits data event after record read', async () => {
      const cb = jest.fn()
      record.on('data', cb)
      await record.read()
      expect(cb).toHaveBeenCalled()
    })

    it('adds data payload to data event', async () => {
      record.on('data', r => {
        expect(r).toEqual({ quote: 'get', author: 'John Doe' })
      })
      await record.read()
    })

    it('emits data event after record update', async () => {
      let counter = 0

      // Test case contains implementation detail, and because of that it is very fragile
      // We have two reads on update
      record.on('data', r => {
        counter = counter + 1
        switch (counter) {
        case 1:
        case 2:
          expect(r).toEqual({ quote: 'get', author: 'John Doe' })
          break
        case 3:
          expect(r).toEqual({ quote: 'get', author: 'John Doe', famous: true })
          break
        default:
        }
      })

      await record.update({ famous: true })
    })
  })
})
