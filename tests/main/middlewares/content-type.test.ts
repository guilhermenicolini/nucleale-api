import app from '@/main/config/app'

import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should return json as default content type', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })
})
