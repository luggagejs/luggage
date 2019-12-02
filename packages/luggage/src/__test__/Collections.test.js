/* eslint max-nested-callbacks: 0 */

import DropboxBackend from '../backends/DummyBackend'
import Collections, { metaProperties } from '../Collections'
import Collection from '../Collection'

const { collectionsList } = metaProperties

describe('Collections', () => {
  let collections
  let backend
  let quotes

  beforeEach(() => {
    quotes = ['test quote']
    backend = new DropboxBackend('quotes', quotes, {
      [collectionsList]: ['daria']
    })
    collections = new Collections('quotes', backend)
  })

  describe('Collections#getList', () => {
    it('reads meta file and returns collections list', async () => {
      const names = await collections.getList()
      expect(names).toEqual(['daria'])
    })

    it('returns empty list if meta doesnt exist', async () => {
      collections.collectionsBackend.metaInfo = null
      const names = await collections.getList()
      expect(names).toEqual([])
    })
  })

  describe('Collections#getInstance', () => {
    it('takes name and returns Collection instance', async () => {
      const collection = await collections.getInstance('test')
      expect(collection).toBeInstanceOf(Collection)
    })

    it('adds namespace to collection name', async () => {
      const collection = await collections.getInstance('carlin')
      expect(collection.name).toEqual('quotes/carlin')
    })
  })

  describe('Collections#getInstances', () => {
    it('returns array of Collection instances', async () => {
      const [collection] = await collections.getInstances()
      expect(collection).toBeInstanceOf(Collection)
    })

    it('returns collection instances in order written in meta info', async () => {
      collections.collectionsBackend.metaInfo = {
        [collectionsList]: ['carlin', 'daria']
      }
      const collectionInstances = await collections.getInstances()
      expect(collectionInstances.map(({ name }) => name)).toEqual(['quotes/carlin', 'quotes/daria'])
    })
  })

  describe('Collections#create', () => {
    it('adds new name to meta info', async () => {
      await collections.create('carlin')
      const names = await collections.getList()

      expect(names).toEqual(['daria', 'carlin'])
    })

    it('returns collection instance after successful create', async () => {
      const collection = await collections.create('carlin')

      expect(collection).toBeDefined()
    })
  })

  describe('Collections#delete', () => {
    it('deletes name from meta info', async () => {
      collections.collectionsBackend.metaInfo = {
        [collectionsList]: ['carlin', 'daria']
      }
      await collections.delete('carlin')
      const names = await collections.getList()

      expect(names).toEqual(['daria'])
    })

    it('returns collection instance after successful delete', async () => {
      const collection = await collections.delete('carlin')

      expect(collection).toBeDefined()
    })
  })

  describe('Collections#readMetaProperty', () => {
    it('reads property from meta file', async () => {
      const names = await collections.readMetaProperty(collectionsList)
      expect(names).toEqual(['daria'])
    })

    it('returns undefined if meta doesnt exist', async () => {
      collections.collectionsBackend.metaInfo = null
      const names = await collections.readMetaProperty(collectionsList)
      expect(names).toBeUndefined()
    })

    it('takes default value', async () => {
      collections.collectionsBackend.metaInfo = null
      const names = await collections.readMetaProperty(collectionsList, ['default'])
      expect(names).toEqual(['default'])
    })
  })

  describe('Collections#writeMetaProperty', () => {
    it('writes property from meta file', async () => {
      await collections.writeMetaProperty('name', 'McFly')

      expect(collections.collectionsBackend.metaInfo).toEqual({
        collectionsList: ['daria'],
        name: 'McFly'
      })
    })
  })
})
