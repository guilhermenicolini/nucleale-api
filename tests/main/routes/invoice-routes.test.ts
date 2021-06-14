import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockId, mockAccessToken, mockAdminAccessToken } from '@/tests/main/mocks'
import { mockInvoice } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import faker from 'faker'

let invoicesCollection: Collection
let accountsCollection: Collection

describe('Invoices Routes', () => {
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

  describe('POST /invoices/upload', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .post('/invoices/upload')
        .send({})
        .expect(401)
    })

    test('Should return 403 if token is not admin', async () => {
      await request(app)
        .post('/invoices/upload')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(403)
    })

    test('Should return 400 if file is invalid', async () => {
      await request(app)
        .post('/invoices/upload')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(400)
    })

    test('Should return 204 on success', async () => {
      await request(app)
        .post('/invoices/upload')
        .attach('xml', 'tests/main/mocks/mock.xml')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(204)

      const invoices = await invoicesCollection.find({}).toArray()
      expect(invoices.length).toBe(2)
    })
  })

  describe('GET /invoices', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .get('/invoices')
        .expect(401)
    })

    test('Should return 200 on success', async () => {
      await request(app)
        .get('/invoices')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(200)
    })
  })

  describe('GET /invoices/:id/download', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .get(`/invoices/${mockId()}/download`)
        .expect(401)
    })

    test('Should return 400 if invalid id is provided', async () => {
      await request(app)
        .get('/invoices/wrong_id/download')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(400)
    })

    test('Should return 404 if invoice does not exists', async () => {
      await request(app)
        .get(`/invoices/${mockId()}/download`)
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(404)
    })

    test('Should return 200 on success', async () => {
      const token = mockAccessToken()
      const taxId = faker.address.zipCode('###########')
      const invoice = mockInvoice(taxId)
      await accountsCollection.insertOne({ accountId: new ObjectId(token.accoundId), taxId, status: 'active' })
      const insertedInvoice = await invoicesCollection.insertOne(invoice)
      await request(app)
        .get(`/invoices/${insertedInvoice.ops[0]._id.toString()}/download`)
        .set('authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect('Content-Type', 'application/pdf')
    })
  })

  describe('POST /invoices', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .post('/invoices')
        .expect(401)
    })
  })
})
