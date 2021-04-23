import { InvoiceMongoRepository, MongoHelper } from '@/infra/db'
import { mockInvoice } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

const makeSut = (): InvoiceMongoRepository => {
  return new InvoiceMongoRepository()
}

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
    await invoicesCollection.deleteMany({})
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
  })
})
