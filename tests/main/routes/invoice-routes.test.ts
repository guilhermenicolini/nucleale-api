import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAccessToken, mockAdminAccessToken } from '@/tests/main/mocks'

import { Collection } from 'mongodb'
import request from 'supertest'

let invoicesCollection: Collection

describe('Invoices Routes', () => {
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
        .send({})
        .expect(401)
    })
  })
})
