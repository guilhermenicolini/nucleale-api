import app from '@/main/config/app'
import { mockAccessToken, mockAdminAccessToken } from '@/tests/main/mocks'

import faker from 'faker'
import request from 'supertest'

describe('Whatsapp Routes', () => {
  describe('POST /whatsapp/message', () => {
    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .post('/whatsapp/message')
        .send({})
        .expect(401)
    })

    test('Should return 403 if token is not admin', async () => {
      await request(app)
        .post('/whatsapp/message')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(403)
    })

    test('Should return 400 if body is invalid', async () => {
      await request(app)
        .post('/whatsapp/message')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .expect(400)
    })

    test('Should return 204 on success', async () => {
      await request(app)
        .post('/whatsapp/message')
        .set('authorization', `Bearer ${mockAdminAccessToken()}`)
        .send({
          mobilePhone: faker.phone.phoneNumber('+55##9########'),
          message: faker.random.words(10)
        })
        .expect(204)
    })
  })
})
