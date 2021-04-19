import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAddChildrenModel, mockChildrenModel } from '@/tests/domain/mocks'
import { mockAccessToken, mockId } from '@/tests/main/mocks'

import { Collection } from 'mongodb'
import request from 'supertest'

let childrensCollection: Collection

describe('Children Routes', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    childrensCollection = await MongoHelper.instance.getCollection('childrens')
    await childrensCollection.deleteMany({})
  })

  describe('POST /childrens', () => {
    test('Should return 401 if no token is provided', async () => {
      await request(app)
        .post('/childrens')
        .send({})
        .expect(401)
    })

    test('Should return 400 on invalid body', async () => {
      await request(app)
        .post('/childrens')
        .send({})
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(400)
    })

    test('Should return 201 on success', async () => {
      await request(app)
        .post('/childrens')
        .send(mockAddChildrenModel())
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(201)
        .then(res => {
          if (!res.body.id) throw new Error('Missing id in body')
        })
    })
  })

  describe('GET /childrens', () => {
    test('Should return 401 if no token is provided', async () => {
      await request(app)
        .get('/childrens')
        .expect(401)
    })

    test('Should return 200 on success with no records', async () => {
      await request(app)
        .get('/childrens')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(200, [])
    })

    test('Should return 200 on success with records', async () => {
      const token = mockAccessToken()
      await childrensCollection.insertOne(mockChildrenModel(token.accoundId))

      await request(app)
        .get('/childrens')
        .set('authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .then(res => {
          if (res.body.length !== 1) throw new Error('Wrong body length')
        })
    })
  })

  describe('PUT /childrens/:id', () => {
    test('Should return 401 if no token is provided', async () => {
      await request(app)
        .put(`/childrens/${mockId()}`)
        .expect(401)
    })

    test('Should return 400 on invalid body', async () => {
      await request(app)
        .put(`/childrens/${mockId}`)
        .send({})
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(400)
    })
  })
})
