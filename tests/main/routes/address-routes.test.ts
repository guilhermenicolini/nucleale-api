import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAddressModel } from '@/tests/domain/mocks'
import { mockAccessToken } from '@/tests/main/mocks'

import { Collection } from 'mongodb'
import request from 'supertest'

let addressesCollection: Collection

describe('Address Routes', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    addressesCollection = await MongoHelper.instance.getCollection('addresses')
    await addressesCollection.deleteMany({})
  })

  describe('PUT /address', () => {
    test('Should return 204 on success', async () => {
      await request(app)
        .put('/address')
        .send(mockAddressModel())
        .set('authorization', `Bearer ${mockAccessToken()}`)
        .expect(204)
    })
  })
})
