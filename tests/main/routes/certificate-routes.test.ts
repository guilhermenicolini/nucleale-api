import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAdminAccessToken, mockAccessToken } from '@/tests/main/mocks'

import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import faker from 'faker'
import { mockCreateCertificateRequest } from '@/tests/domain/mocks'
import { createCompanyDatabase } from '@/tests/infra/mocks'

let certificatesCollection: Collection
let accountsCollection: Collection
let addressesCollection: Collection

describe('Certificate Routes', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    certificatesCollection = await MongoHelper.instance.getCollection('certificates')
    accountsCollection = await MongoHelper.instance.getCollection('accounts')
    addressesCollection = await MongoHelper.instance.getCollection('addresses')
    await certificatesCollection.deleteMany({})
    await accountsCollection.deleteMany({})
    await addressesCollection.deleteMany({})
  })

  describe('POST /invoices', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .post('/certificates')
        .expect(401)
    })

    test('Should return 403 if token is not admin', async () => {
      await request(app)
        .post('/certificates')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(403)
    })

    test('Should return 400 if body is invalid', async () => {
      await request(app)
        .post('/certificates')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(400)
    })

    test('Should return 203 on success', async () => {
      const data = mockCreateCertificateRequest()
      const company = await createCompanyDatabase()
      data.procedure = company.procedure

      await accountsCollection.insertOne({
        _id: new ObjectId(data.user),
        accountId: new ObjectId(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        mobilePhone: faker.phone.phoneNumber()
      })

      await request(app)
        .post('/certificates')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .send(data)
        .expect(204)
    })
  })
})
