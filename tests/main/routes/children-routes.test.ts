import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAddChildrenModel, mockChildrenModel, mockUpdateChildrenBody } from '@/tests/domain/mocks'
import { mockAccessToken, mockId } from '@/tests/main/mocks'

import { Collection, ObjectId } from 'mongodb'
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

  describe('POST /me/childrens', () => {
    test('Should return 401 if no token is provided', async () => {
      await request(app)
        .post('/me/childrens')
        .send({})
        .expect(401)
    })

    test('Should return 400 on invalid body', async () => {
      await request(app)
        .post('/me/childrens')
        .send({})
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(400)
    })

    test('Should return 201 on success', async () => {
      await request(app)
        .post('/me/childrens')
        .send(mockAddChildrenModel())
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(201)
        .then(res => {
          if (!res.body.id) throw new Error('Missing id in body')
        })
    })
  })

  describe('GET /me/childrens', () => {
    test('Should return 401 if no token is provided', async () => {
      await request(app)
        .get('/me/childrens')
        .expect(401)
    })

    test('Should return 200 on success with no records', async () => {
      await request(app)
        .get('/me/childrens')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(200, [])
    })

    test('Should return 200 on success with records', async () => {
      const token = mockAccessToken()
      await childrensCollection.insertOne(mockChildrenModel(token.accoundId))

      await request(app)
        .get('/me/childrens')
        .set('authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .then(res => {
          if (res.body.length !== 1) throw new Error('Wrong body length')
        })
    })
  })

  describe('PUT /me/childrens/:id', () => {
    test('Should return 401 if no token is provided', async () => {
      await request(app)
        .put(`/me/childrens/${mockId()}`)
        .expect(401)
    })

    test('Should return 400 on invalid body', async () => {
      await request(app)
        .put(`/me/childrens/${mockId().toString()}`)
        .send({})
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(400)
    })

    test('Should return 204 on success', async () => {
      const token = mockAccessToken()
      const data = {
        _id: new ObjectId(),
        accountId: new ObjectId(token.accoundId)
      }
      await childrensCollection.insertOne(data)
      await request(app)
        .put(`/me/childrens/${data._id.toString()}`)
        .send(mockUpdateChildrenBody())
        .set('authorization', `Bearer ${token.accessToken}`)
        .expect(204)
    })
  })

  describe('DELETE /me/childrens/:id', () => {
    test('Should return 401 if no token is provided', async () => {
      await request(app)
        .delete(`/me/childrens/${mockId()}`)
        .expect(401)
    })
  })

  test('Should return 400 on invalid id', async () => {
    await request(app)
      .delete('/me/childrens/any_id')
      .send({})
      .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
      .expect(400)
  })

  test('Should return 404 if children not exists', async () => {
    await request(app)
      .delete(`/me/childrens/${mockId()}`)
      .send({})
      .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
      .expect(404)
  })

  test('Should return 204 on success', async () => {
    const token = mockAccessToken()
    const data = {
      _id: new ObjectId(),
      accountId: new ObjectId(token.accoundId)
    }
    await childrensCollection.insertOne(data)
    await request(app)
      .delete(`/me/childrens/${data._id.toString()}`)
      .set('authorization', `Bearer ${token.accessToken}`)
      .expect(204)
  })
})
