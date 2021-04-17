import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

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
  })
})
