import app from '@/main/config/app'
import { mockAccessToken } from '@/tests/main/mocks'

import request from 'supertest'
import faker from 'faker'

const mockZip = (): string => faker.address.zipCode('########')

describe('Location Routes 2', () => {
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
