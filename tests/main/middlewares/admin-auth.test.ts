import app from '@/main/config/app'
import { adminAuth } from '@/main/middlewares'
import { mockInvalidAccessToken, mockAccessToken } from '@/tests/main/mocks'

import request from 'supertest'

describe('Auth Middleware', () => {
  test('Should return 401 if no token is provided', async () => {
    app.get('/admin-auth', adminAuth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/admin-auth')
      .expect(401)
  })

  test('Should return 401 if token is not bearer', async () => {
    app.get('/admin-auth', adminAuth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/admin-auth')
      .set('authorization', 'any_token')
      .expect(401)
  })

  test('Should return 401 if token is not valid', async () => {
    app.get('/admin-auth', adminAuth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/admin-auth')
      .set('authorization', `Bearer ${mockInvalidAccessToken()}`)
      .expect(401)
  })

  test('Should return 403 if token is invalid', async () => {
    app.get('/admin-auth', adminAuth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/admin-auth')
      .set('authorization', `Bearer ${mockInvalidAccessToken()}`)
      .expect(401)
  })

  test('Should return 403 token is not admin', async () => {
    app.get('/admin-auth', adminAuth, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/admin-auth')
      .set('authorization', `Bearer ${mockAccessToken()}`)
      .expect(403)
  })
})
