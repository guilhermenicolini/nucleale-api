import { ChildrenMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddChildrenModel } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

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
})
