import { ChildrenMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddChildrenModel, mockChildrenModel, mockUpdateChildrenModel } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'

const makeSut = (): ChildrenMongoRepository => {
  return new ChildrenMongoRepository()
}

let childrensCollection: Collection

describe('ChildrenMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    childrensCollection = await MongoHelper.instance.getCollection('childrens')
    await childrensCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add on success', async () => {
      const sut = makeSut()
      const data = mockAddChildrenModel()
      const id = await sut.add(data)
      const childrens = await childrensCollection.find({}).toArray()
      expect(childrens.length).toBe(1)
      expect(childrens[0]._id.toString()).toBe(id)
      expect(childrens[0].accountId.toString()).toBe(data.accountId)
      expect(childrens[0].name).toBe(data.name)
      expect(childrens[0].birth).toBe(data.birth)
      expect(childrens[0].gender).toBe(data.gender)
    })
  })

  describe('load()', () => {
    test('Should return childrens on success', async () => {
      const accountId = new ObjectId().toString()
      const sut = makeSut()
      const data = [mockChildrenModel(accountId), mockChildrenModel(accountId)]
      await childrensCollection.insertMany(data)
      const childrens = await sut.load(accountId)
      expect(childrens.length).toBe(2)
    })

    test('Should return empty array if not exists', async () => {
      const accountId = new ObjectId().toString()
      const sut = makeSut()
      const childrens = await sut.load(accountId)
      expect(childrens.length).toBe(0)
    })
  })

  describe('update()', () => {
    test('Should update children on success', async () => {
      const sut = makeSut()
      const toInsert = mockChildrenModel()
      await childrensCollection.insertOne(toInsert)
      const data = mockUpdateChildrenModel(toInsert._id.toString(), toInsert.accountId.toString())
      const result = await sut.update(data)
      expect(result).toBe(true)
      const childrens = await childrensCollection.find({}).toArray()
      expect(childrens.length).toBe(1)
      expect(childrens[0]._id.toString()).toBe(data.id)
      expect(childrens[0].accountId.toString()).toBe(data.accountId)
      expect(childrens[0].name).toBe(data.name)
      expect(childrens[0].birth).toBe(data.birth)
      expect(childrens[0].gender).toBe(data.gender)
    })

    test('Should return false if not exists', async () => {
      const sut = makeSut()
      const data = mockUpdateChildrenModel()
      const result = await sut.update(data)
      expect(result).toBe(false)
    })
  })

  describe('delete()', () => {
    test('Should delete children on success', async () => {
      const sut = makeSut()
      const toDelete = mockChildrenModel()
      await childrensCollection.insertOne(toDelete)
      const result = await sut.delete({
        id: toDelete._id.toString(),
        accountId: toDelete.accountId.toString()
      })
      const childrens = await childrensCollection.find({}).toArray()
      expect(childrens.length).toBe(0)
      expect(result).toBe(true)
    })

    test('Should not delete children if not find', async () => {
      const sut = makeSut()
      const toDelete = mockChildrenModel()
      await childrensCollection.insertOne(toDelete)
      const result = await sut.delete({
        id: new ObjectId().toString(),
        accountId: toDelete.accountId.toString()
      })
      const childrens = await childrensCollection.find({}).toArray()
      expect(childrens.length).toBe(1)
      expect(result).toBe(false)
    })
  })
})
