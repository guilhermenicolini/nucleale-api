import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAccessToken } from '@/tests/main/mocks'

import { Collection } from 'mongodb'
import request from 'supertest'

let childrensCollection: Collection

describe('Children Routes', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    childrensCollection = await MongoHelper.instance.getCollection('childrens')
    await childrensCollection.deleteMany({})
  })

  describe('POST /childrens', () => {
    test('Should return 401 if no token is provided', async () => {
      await request(app)
        .post('/childrens')
        .send({})
        .expect(401)
    })

    test('Should return 400 on invalid body', async () => {
      await request(app)
        .post('/childrens')
        .send({})
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(400)
    })
  })
})
