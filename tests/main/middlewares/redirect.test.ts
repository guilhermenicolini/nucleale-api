import app from '@/main/config/app'
import { redirect } from '@/main/middlewares'

import request from 'supertest'

describe('Redirect Middleware', () => {
  test('Should redirect to specified route', async () => {
    app.get('/test-redirect', redirect('/redirect'))
    await request(app)
      .get('/test-redirect')
      .expect(302)
      .expect('location', /redirect/)
  })
})
