import app from '@/main/config/app'
import { auth } from '@/main/middlewares'
import { mockInvalidAccessToken } from '@/tests/main/mocks'

import request from 'supertest'

describe('Auth Middleware', () => {
  test('Should return 401 if no token is provided', async () => {
    app.get('/auth', auth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/auth')
      .expect(401)
  })

  test('Should return 401 if token is not bearer', async () => {
    app.get('/auth', auth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/auth')
      .set('authorization', 'any_token')
      .expect(401)
  })

  test('Should return 401 if token is not valid', async () => {
    app.get('/auth', auth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/auth')
      .set('authorization', `Bearer ${mockInvalidAccessToken()}`)
      .expect(401)
  })

  test('Should return 403 if token is invalid', async () => {
    app.get('/auth', auth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/auth')
      .set('authorization', `Bearer ${mockInvalidAccessToken()}`)
      .expect(401)
  })
})
