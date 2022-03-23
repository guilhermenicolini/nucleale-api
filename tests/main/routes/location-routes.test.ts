import app from '@/main/config/app'
import { mockAccessToken } from '@/tests/main/mocks'

import request from 'supertest'
import { MongoHelper } from '@/infra/db'

const mockZip = (): string => '12345678'

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
