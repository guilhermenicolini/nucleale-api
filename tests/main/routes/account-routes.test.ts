import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAccountModel } from '@/tests/domain/mocks'
import { mockAccessToken, mockAdminAccessToken, mockId } from '@/tests/main/mocks'

import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import faker from 'faker'

import { AccountStatus } from '@/domain/models'

let accountCollection: Collection

describe('Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.instance.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('GET /accounts/status/:status', () => {
    test('Should return 400 if status is invalid', async () => {
      await request(app)
        .get('/accounts/status/wrong_status')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(400)
    })

    test('Should return 200 with empty array if no records was found', async () => {
      await request(app)
        .get('/accounts/status/awaitingVerification')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(200, [])
    })

    test('Should return 200 with item if record was found', async () => {
      const data = mockAccountModel()
      const { id, ...obj } = data
      await accountCollection.insertOne({ ...obj, _id: new ObjectId(id) })
      await request(app)
        .get(`/accounts/status/${AccountStatus.awaitingVerification}`)
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(200)
        .expect(function (res) {
          if (res.body.length !== 1) throw new Error('Body must have 1 item')
          const item = res.body[0]
          if (item.taxId !== data.taxId) throw new Error('Invalid taxId')
          if (item.name !== data.name) throw new Error('Invalid name')
          if (item.email !== data.email) throw new Error('Invalid email')
          if (item.mobilePhone !== data.mobilePhone) throw new Error('Invalid mobilePhone')
          if (item.birth !== data.birth) throw new Error('Invalid birth')
          if (item.status !== data.status) throw new Error('Invalid status')
          if (item.role !== data.role) throw new Error('Invalid role')
          if (item.id !== data.id) throw new Error('Invalid id')
        })
    })
  })

  describe('POST /accounts/:id/approve', () => {
    test('Should return 404 if record was not found', async () => {
      await request(app)
        .post(`/accounts/${mockId()}/approve`)
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(404)
    })

    test('Should return 400 if id is invalid', async () => {
      await request(app)
        .post('/accounts/any_id/approve')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(400)
    })

    test('Should return 400 if account is not in awaiting verification', async () => {
      const data = mockAccountModel()
      data.status = AccountStatus.active
      const { id, ...obj } = data
      await accountCollection.insertOne({ ...obj, _id: new ObjectId(id) })

      await request(app)
        .post(`/accounts/${id}/approve`)
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(400)
    })

    test('Should return 204 on success', async () => {
      const data = mockAccountModel()
      const { id, ...obj } = data
      await accountCollection.insertOne({ ...obj, _id: new ObjectId(id) })

      await request(app)
        .post(`/accounts/${id}/approve`)
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(204)
    })
  })

  describe('POST /accounts/invite/:email', () => {
    test('Should return 400 if email is invalid', async () => {
      await request(app)
        .post(`/accounts/invite/${faker.random.word()}`)
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(400)
    })

    test('Should return 204 on success', async () => {
      await request(app)
        .post(`/accounts/invite/${faker.internet.email()}`)
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect({})
    })
  })
})
