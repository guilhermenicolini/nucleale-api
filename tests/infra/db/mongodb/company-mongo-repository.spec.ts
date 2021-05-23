import { CompanyMongoRepository, MongoHelper } from '@/infra/db'

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
    test('Should returns null if company not exists', async () => {
      const sut = makeSut()
      const company = await sut.load()
      expect(company).toBeFalsy()
    })
  })
})
