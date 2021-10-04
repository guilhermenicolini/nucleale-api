import { LinkTypes } from '@/domain/models'
import { LinkMongoRepository, MongoHelper } from '@/infra/db'

import { Collection, ObjectId } from 'mongodb'
import MockDate from 'mockdate'
import moment from 'moment-timezone'

const mockData = () => ({
  type: LinkTypes.passwordRecovery,
  id: new ObjectId().toString(),
  userId: new ObjectId().toString(),
  expiration: new Date().valueOf()
})

const mockDbData = () => ({
  type: LinkTypes.passwordRecovery,
  _id: new ObjectId(),
  userId: new ObjectId(),
  expiration: new Date().valueOf()
})

const now = 1619909155082

const makeSut = (): LinkMongoRepository => {
  return new LinkMongoRepository()
}

let linksCollection: Collection

describe('LinkMongoRepository', () => {
  beforeAll(async () => {
    MockDate.set(now)
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    linksCollection = await MongoHelper.instance.getCollection('links')
    await linksCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add on success', async () => {
      const sut = makeSut()
      const data = mockData()
      const result = await sut.add(data)
      expect(result.link).toBeTruthy()
      expect(result.expiration).toBe(moment(now).add(1, 'hour').valueOf())
    })

    test('Should replace on success', async () => {
      const sut = makeSut()
      const data = mockDbData()
      await linksCollection.insertOne(data)

      const result = await sut.add({
        id: data.userId.toString(),
        type: data.type
      })
      const links = await linksCollection.find({}).toArray()
      expect(links.length).toBe(1)
      expect(result.link).toBeTruthy()
      expect(result.expiration).toBe(moment(now).add(1, 'hour').valueOf())
    })
  })

  describe('load()', () => {
    test('Should return null if token not exists', async () => {
      const sut = makeSut()
      const type = LinkTypes.passwordRecovery
      const token = new ObjectId().toString()

      const result = await sut.load({
        token,
        type
      })
      expect(result).toBeFalsy()
    })

    test('Should return link if token exists', async () => {
      const sut = makeSut()
      const type = LinkTypes.passwordRecovery
      const token = (await linksCollection.insertOne({ type })).insertedId.toString()

      const result = await sut.load({
        token,
        type
      })
      expect(result).toBeTruthy()
    })
  })

  describe('delete()', () => {
    test('Should delete link on success', async () => {
      const sut = makeSut()
      const data = {
        _id: new ObjectId()
      }
      await linksCollection.insertOne(data)
      const result = await sut.delete(data._id.toString())
      const links = await linksCollection.find({}).toArray()
      expect(links.length).toBe(0)
      expect(result).toBeFalsy()
    })

    test('Should not delete link if not found', async () => {
      const sut = makeSut()
      await linksCollection.insertOne({})
      const result = await sut.delete(new ObjectId().toString())
      const links = await linksCollection.find({}).toArray()
      expect(links.length).toBe(1)
      expect(result).toBeFalsy()
    })
  })
})
