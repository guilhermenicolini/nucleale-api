import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAccessToken, mockAdminAccessToken } from '@/tests/main/mocks'
import { mockInvoice, mockInvoiceDb } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import faker from 'faker'

import { createInvoiceDatabase } from '@/tests/infra/mocks'
import { downloadStub } from '@/tests/mock'

let invoicesCollection: Collection
let accountsCollection: Collection
let addressesCollection: Collection

const certificate = '-----BEGIN CERTIFICATE-----\nMIIEWzCCA0OgAwIBAgIBADANBgkqhkiG9w0BAQsFADB8MQswCQYDVQQGEwJCUjES\nMBAGA1UECBQJU+NvIFBhdWxvMREwDwYDVQQHEwhDYW1waW5hczEPMA0GA1UEChMG\nSW5nYWlhMSAwHgYJKoZIhvcNAQkBFhFpbmdhaWFAaW5nYWlhLmNvbTETMBEGA1UE\nAxMKSW5nYWlhLmNvbTAeFw0xOTAyMjIxNTE2MDZaFw0yOTAyMTkxNTE2MDZaMHwx\nCzAJBgNVBAYTAkJSMRIwEAYDVQQIFAlT428gUGF1bG8xETAPBgNVBAcTCENhbXBp\nbmFzMQ8wDQYDVQQKEwZJbmdhaWExIDAeBgkqhkiG9w0BCQEWEWluZ2FpYUBpbmdh\naWEuY29tMRMwEQYDVQQDEwpJbmdhaWEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOC\nAQ8AMIIBCgKCAQEAzr3CWZL751ijZ+lEUYxu501ORenpsX2CcYVElVjHfWwkFxeq\nMhZXc7mFlKNm+JMRcADrCKqMPTZMkDTVaz7FT5EBfR5E+Kx2mskN8vgtZCHIZ/d7\nXLg9nftquQzKLgP98zv4nR/U0ZfZgLwtVusRuI/UDA3/uCGcsWwRPhbJ4uVk2bgG\nKZmw7nZ+bVmkaBDVdNklMaoIL0ghUniw1cTnF6EtMd3gTAG/lV8qJFMgQehsrU7J\n+DInsxV3/5Pu8g2Dr3QQwkVnfbBj1vKfrpGwjeq7vEGg3M8TKJ2kCg+53H7lfjJL\nImtWZf20cml6D3rxUWqqjxwhINWbmdgwB70nEwIDAQABo4HnMIHkMB0GA1UdDgQW\nBBT6bsJCkW3Mg/ByDLq9xUgV5CqcWjCBpwYDVR0jBIGfMIGcgBT6bsJCkW3Mg/By\nDLq9xUgV5CqcWqGBgKR+MHwxCzAJBgNVBAYTAkJSMRIwEAYDVQQIFAlT428gUGF1\nbG8xETAPBgNVBAcTCENhbXBpbmFzMQ8wDQYDVQQKEwZJbmdhaWExIDAeBgkqhkiG\n9w0BCQEWEWluZ2FpYUBpbmdhaWEuY29tMRMwEQYDVQQDEwpJbmdhaWEuY29tggEA\nMAwGA1UdEwQFMAMBAf8wCwYDVR0PBAQDAgEGMA0GCSqGSIb3DQEBCwUAA4IBAQBY\ne0UtYttL66TVOsFCfD0Y66QQPGLReUigHDkMZeel5ruB7rj2zAIDjMCqUNqy7hsz\nxpbhTjoM/4q345ZIMKDgIMPSapm/rciVKglIQXqws3vpDIrF9Iv5C8px42PcbPa4\nhxwh0eWmqBUQvA+0H+HZlBTc6yH8GED8yz6vIZwwYnGiTT3OvR1yyTbl+VyydbfR\nNRORXGzvgyIfdQ/5o/BRVeDI5P75m2s5A/jD8V5wr0A0fwUHzdQQpAK2VpzFg4II\ns98Tfq690EFtKO4eosq8jQCG/91HXUxKmIM6NYBUV0e2eR5Gq0yHs9AJqpI4/pkz\nXU4xzB5IdNucYW7bn3h2\n-----END CERTIFICATE-----'
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIBVwIBADANBgkqhkiG9w0BAQEFAASCAUEwggE9AgEAAkEAur+k2p148nOQH4KY\neV6wo1IPyk2nwewOjvYR/wYi3CGYpsQg6jzAPJiegWmFI9KFGv73wWBjjaQ2ZDWW\nPoo48wIDAQABAkEAn9RJqXlA/HB/lxhUmvu5ve4L6Z8Qxt3bj+t2d4eu6iq4kHzi\nwTjGTSGUOc/PdXhy5QGRg1k6lfTm8WD6GZVtkQIhANrNr7UHSVT3sYiy0U8/fV2p\nTww/3xC1MWJrLTM1YagNAiEA2n7uq7OBMz/5WDChkfr4kLHPgp5rfUI/HzJnXjaq\nJP8CIQCmeHPEocSTVtjGDnbdeoqhZh10TmwixBjMrop3OZgRSQIhAMWrNA1ONkLB\nS7lHNcS1go6U7qDC5YfKmQSGOxH27nLNAiEAjKyYR0FnB1Uwut6J5sGN5Etm2+xr\nKsi576waNub+l2c=\n-----END PRIVATE KEY-----'

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
    addressesCollection = await MongoHelper.instance.getCollection('addresses')
    await invoicesCollection.deleteMany({})
    await accountsCollection.deleteMany({})
    await addressesCollection.deleteMany({})
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

  describe('GET /invoices/:invoiceNo/download', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .get(`/invoices/${faker.datatype.number()}/download`)
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
        .get(`/invoices/${faker.datatype.number()}/download`)
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(404)
    })

    test('Should return 200 on success', async () => {
      const token = mockAccessToken()
      const taxId = faker.address.zipCode('###########')
      const invoice = mockInvoice(taxId)
      await accountsCollection.insertOne({ accountId: new ObjectId(token.accoundId), taxId, status: 'active' })
      await invoicesCollection.insertOne(invoice)
      await request(app)
        .get(`/invoices/${invoice.invoiceNo}/download`)
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

    test('Should return 403 if token is not admin', async () => {
      await request(app)
        .post('/invoices')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(403)
    })

    test('Should return 400 if body is invalid', async () => {
      await request(app)
        .post('/invoices')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(400)
    })

    test('Should return 204 on success', async () => {
      downloadStub
        .mockImplementationOnce(() => [Buffer.from(certificate)])
        .mockImplementationOnce(() => [Buffer.from(privateKey)])
      const data = await createInvoiceDatabase()
      await request(app)
        .post('/invoices')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .send(data)
        .expect(204)
    })
  })

  describe('POST /invoices/:invoiceNo/resend', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .post('/invoices/1/resend')
        .expect(401)
    })

    test('Should return 403 if token is not admin', async () => {
      await request(app)
        .post('/invoices/1/resend')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(403)
    })

    test('Should return 204 on success', async () => {
      const invoice = mockInvoiceDb()
      await invoicesCollection.insertOne(invoice)
      await accountsCollection.insertOne({
        accountId: new ObjectId(),
        name: invoice.taker.name,
        email: invoice.taker.email,
        status: 'active'
      })
      await request(app)
        .post(`/invoices/${invoice.invoiceNo}/resend`)
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(204)
    })
  })
})
