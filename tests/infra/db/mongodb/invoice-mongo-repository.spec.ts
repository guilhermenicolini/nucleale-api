import { InvoiceMongoRepository, MongoHelper } from '@/infra/db'
import { mockInvoice } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'

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
      const taxId = '32051856095'
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

  test('Should return empty array if there are no invoices for active accounts', async () => {
    const sut = makeSut()
    const accountId = new ObjectId()
    const taxId = '32051856095'
    const accounts = [
      { accountId, taxId, status: 'active' }
    ]
    await accountsCollection.insertMany(accounts)
    const result = await sut.load(accountId.toString())
    expect(result.length).toBe(0)
  })

  test('Should return empty array if there are no accounts', async () => {
    const sut = makeSut()
    const result = await sut.load(new ObjectId().toString())
    expect(result.length).toBe(0)
  })

  describe('loadOne()', () => {
    test('Should return invoice only if account is active', async () => {
      const sut = makeSut()
      const accountId = new ObjectId()
      const taxId = '32051856095'
      const invoice = mockInvoice(taxId)
      await accountsCollection.insertOne({ accountId, taxId, status: 'active' })
      await invoicesCollection.insertOne(invoice)
      const result = await sut.loadOne(invoice.invoiceNo, accountId.toString())
      expect(result).toBeTruthy()
    })

    test('Should not return invoice if account is not active', async () => {
      const sut = makeSut()
      const accountId = new ObjectId()
      const taxId = '32051856095'
      const invoice = mockInvoice(taxId)
      await accountsCollection.insertOne({ accountId, taxId, status: 'inactive' })
      await invoicesCollection.insertOne(invoice)
      const result = await sut.loadOne(invoice.invoiceNo, accountId.toString())
      expect(result).toBeFalsy()
    })

    test('Should not return invoice if invoice is not Normal', async () => {
      const sut = makeSut()
      const accountId = new ObjectId()
      const taxId = '32051856095'
      const invoice = mockInvoice(taxId)
      invoice.status = 'Cancelado'
      await accountsCollection.insertOne({ accountId, taxId, status: 'active' })
      await invoicesCollection.insertOne(invoice)
      const result = await sut.loadOne(invoice.invoiceNo, accountId.toString())
      expect(result).toBeFalsy()
    })
  })

  describe('next()', () => {
    test('Should return 1 if there are no invoices', async () => {
      const sut = makeSut()
      const result = await sut.next()
      expect(result).toBe(1)
    })

    test('Should return 1 if there are invoices with no rpsNumber', async () => {
      const sut = makeSut()
      const invoice = mockInvoice()
      invoice.rpsNumber = null
      await invoicesCollection.insertOne(invoice)
      const result = await sut.next()
      expect(result).toBe(1)
    })

    test('Should return the max rpsNumber', async () => {
      const sut = makeSut()
      const invoice = mockInvoice()
      invoice.rpsNumber = 200
      await invoicesCollection.insertMany([mockInvoice(), mockInvoice(), invoice, mockInvoice()])
      const result = await sut.next()
      expect(result).toBe(201)
    })
  })

  describe('loadByNumber()', () => {
    test('Should return invoice on success', async () => {
      const sut = makeSut()
      const invoice = mockInvoice()
      await invoicesCollection.insertOne(invoice)
      const result = await sut.loadByNumber(invoice.invoiceNo)
      expect(result).toBeTruthy()
    })

    test('Should not return invoice if not exists', async () => {
      const sut = makeSut()
      const result = await sut.loadByNumber(1)
      expect(result).toBeFalsy()
    })
  })
})
