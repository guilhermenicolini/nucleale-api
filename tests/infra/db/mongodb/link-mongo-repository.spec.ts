import { LinkTypes } from '@/domain/models'
import { LinkMongoRepository, MongoHelper } from '@/infra/db'

import { Collection, ObjectId } from 'mongodb'
import MockDate from 'mockdate'
import moment from 'moment-timezone'

const mockData = () => ({
  type: LinkTypes.passwordRecovery,
  id: new ObjectId().toString()
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
  })
})
