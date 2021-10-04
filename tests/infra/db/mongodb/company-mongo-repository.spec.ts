import { CompanyMongoRepository, MongoHelper } from '@/infra/db'
import { mockCompanyModel, mockDbServiceWithProcedure } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'

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

  describe('loadProcedure()', () => {
    test('Should return null if procedure not exists', async () => {
      const sut = makeSut()
      const procedure = await sut.loadProcedure(new ObjectId().toString())
      expect(procedure).toBeFalsy()
    })

    test('Should return procedure on success', async () => {
      const sut = makeSut()
      const data = {
        services: [mockDbServiceWithProcedure()]
      }
      const inserted = await companiesCollection.insertOne(data)
      const company = await companiesCollection.findOne({ _id: inserted.insertedId })
      const procedureId = company.services[0].procedures[0]._id.toString()
      const procedure = await sut.loadProcedure(procedureId)
      expect(procedure).toEqual({
        id: data.services[0].procedures[0]._id.toString(),
        name: data.services[0].procedures[0].name,
        description: data.services[0].procedures[0].description,
        service: {
          id: data.services[0]._id.toString(),
          name: data.services[0].name,
          activity: data.services[0].activity,
          aliquote: data.services[0].aliquote,
          cnae: data.services[0].cnae,
          operation: data.services[0].operation,
          pickupType: data.services[0].pickupType,
          service: data.services[0].service,
          taxation: data.services[0].taxation,
          taxable: data.services[0].taxable,
          procedures: null
        }
      })
    })
  })
})
