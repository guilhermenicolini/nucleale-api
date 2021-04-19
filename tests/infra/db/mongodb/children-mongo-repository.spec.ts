import { ChildrenMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddChildrenModel, mockChildrenModel } from '@/tests/domain/mocks'

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
      childrensCollection.insertMany(data)
      const childrens = await sut.load(accountId)
      expect(childrens.length).toBe(2)
      expect(childrens[0].id.toString()).toBe(data[0]._id.toString())
      expect(childrens[0].name).toBe(data[0].name)
      expect(childrens[0].birth).toBe(data[0].birth)
      expect(childrens[0].gender).toBe(data[0].gender)
      expect(childrens[1].id.toString()).toBe(data[1]._id.toString())
      expect(childrens[1].name).toBe(data[1].name)
      expect(childrens[1].birth).toBe(data[1].birth)
      expect(childrens[1].gender).toBe(data[1].gender)
    })

    test('Should return empty array if not exists', async () => {
      const accountId = new ObjectId().toString()
      const sut = makeSut()
      const childrens = await sut.load(accountId)
      expect(childrens.length).toBe(0)
    })
  })
})
