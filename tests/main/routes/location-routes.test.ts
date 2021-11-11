import app from '@/main/config/app'
import { mockAccessToken } from '@/tests/main/mocks'

import request from 'supertest'
import faker from 'faker'
import { MongoHelper } from '@/infra/db'

const mockZip = (): string => faker.address.zipCode('########')

describe('Location Routes', () => {
  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  describe('GET /locations/:zip', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .get(`/locations/${mockZip()}`)
        .expect(401)
    })

    test('Should return 200 on success', async () => {
      await request(app)
        .get(`/locations/${mockZip()}`)
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(200)
    })
  })
})
