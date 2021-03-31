import app from '@/main/config/app'
import env from '@/main/config/env'

import request from 'supertest'

describe('Lets Encrypt Middleware', () => {
  test('Should return certbot response', async () => {
    await request(app)
      .get('/.well-known/acme-challenge')
      .expect(200)
      .expect(env.certbot)
  })
})
