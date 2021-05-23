import { CompanyMongoRepository, MongoHelper } from '@/infra/db'
import { mockCompanyModel } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

const makeSut = (): CompanyMongoRepository => {
  return new CompanyMongoRepository()
}

let companiesCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    companiesCollection = await MongoHelper.instance.getCollection('companies')
    await companiesCollection.deleteMany({})
  })

  describe('load()', () => {
    test('Should return null if company not exists', async () => {
      const sut = makeSut()
      const company = await sut.load()
      expect(company).toBeFalsy()
    })

    test('Should return company on success', async () => {
      const sut = makeSut()
      const data = mockCompanyModel()
      await companiesCollection.insertOne(data)
      const company = await sut.load()
      expect(company).toEqual(MongoHelper.instance.map(data))
    })
  })
})
