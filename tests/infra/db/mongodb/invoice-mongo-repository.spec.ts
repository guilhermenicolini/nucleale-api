import { InvoiceMongoRepository, MongoHelper } from '@/infra/db'
import { mockInvoice } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'
import faker from 'faker'

const makeSut = (): InvoiceMongoRepository => {
  return new InvoiceMongoRepository()
}

let accountsCollection: Collection
let invoicesCollection: Collection

describe('InvoiceMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    invoicesCollection = await MongoHelper.instance.getCollection('invoices')
    accountsCollection = await MongoHelper.instance.getCollection('accounts')
    await invoicesCollection.deleteMany({})
    await accountsCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should not insert if invoice exists', async () => {
      const sut = makeSut()
      const data = mockInvoice()
      await invoicesCollection.insertOne({ invoiceNo: data.invoiceNo })
      await sut.save(data)
      const invoices = await invoicesCollection.find({}).toArray()
      expect(invoices.length).toBe(1)
    })

    test('Should insert if invoice not exists', async () => {
      const sut = makeSut()
      const data = mockInvoice()
      await sut.save(data)
      const invoices = await invoicesCollection.find({}).toArray()
      expect(invoices.length).toBe(1)
    })
  })

  describe('load()', () => {
    test('Should return all invoices only of active accounts', async () => {
      const sut = makeSut()
      const accountId = new ObjectId()
      const taxId = faker.address.zipCode('###########')
      const invoices = [mockInvoice(taxId), mockInvoice(taxId), mockInvoice()]
      const accounts = [
        { accountId, taxId, status: 'active' },
        { accountId, taxId: invoices[2].taker.taxId, status: 'inactive' }
      ]
      await accountsCollection.insertMany(accounts)
      await invoicesCollection.insertMany(invoices)
      const result = await sut.load(accountId.toString())
      expect(result.length).toBe(2)
    })
  })
})
