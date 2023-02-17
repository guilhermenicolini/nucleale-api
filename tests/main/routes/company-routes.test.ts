import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import { mockAccessToken, mockAdminAccessToken } from '@/tests/main/mocks'

import request from 'supertest'

describe('Company Routes', () => {
  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  describe('GET /company/procedures', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .get('/company/procedures')
        .send({})
        .expect(401)
    })

    test('Should return 403 if token is not admin', async () => {
      await request(app)
        .get('/company/procedures')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(403)
    })

    test('Should return 200 on success', async () => {
      await request(app)
        .get('/company/procedures')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(200)
    })
  })
})
