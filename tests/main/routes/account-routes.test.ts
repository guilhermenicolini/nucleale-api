import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import request from 'supertest'
import faker from 'faker'

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
    test('Should return 200 on signup', async () => {
      const password = faker.internet.password()
      await request(app)
        .post('/api/signup')
        .send({
          email: faker.internet.email(),
          password,
          passwordConfirmation: password
        })
        .expect(200)
    })
  })
})
