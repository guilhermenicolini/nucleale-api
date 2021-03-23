import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import request from 'supertest'
import faker from 'faker'

const mockRequest = () => {
  const password = faker.internet.password()
  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

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

  describe('POST /signup', () => {
    test('Should return 201 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send(mockRequest())
        .expect(201)
        .expect(function (res) {
          if (!('accessToken' in res.body)) throw new Error('Missing accessToken')
        })
    })

    test('Should return 400 on signup if body is ivalid', async () => {
      const params = mockRequest()
      await accountCollection.insertOne({ email: params.email })
      await request(app)
        .post('/api/signup')
        .send({})
        .expect(400)
    })

    test('Should return 409 on signup if email was taken', async () => {
      const params = mockRequest()
      await accountCollection.insertOne({ email: params.email })
      await request(app)
        .post('/api/signup')
        .send(params)
        .expect(409)
    })
  })
})
