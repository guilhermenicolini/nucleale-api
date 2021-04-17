import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAddressModel, mockAddAddressModel } from '@/tests/domain/mocks'
import { mockAccessToken } from '@/tests/main/mocks'

import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'

let addressesCollection: Collection

describe('Address Routes', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    addressesCollection = await MongoHelper.instance.getCollection('addresses')
    await addressesCollection.deleteMany({})
  })

  describe('PUT /address', () => {
    test('Should return 204 on success', async () => {
      await request(app)
        .put('/address')
        .send(mockAddressModel())
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(204)
    })

    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .put('/address')
        .send({})
        .expect(401)
    })

    test('Should return 400 on invalid body', async () => {
      await request(app)
        .put('/address')
        .send({})
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(400)
    })
  })

  describe('GET /address', () => {
    test('Should return 200 with address on success', async () => {
      const token = mockAccessToken()
      const data = mockAddAddressModel(token.accoundId)
      const { accountId, ...obj } = data
      await addressesCollection.insertOne({ ...obj, accountId: new ObjectId(accountId) })
      await request(app)
        .get('/address')
        .set('authorization', `Bearer ${token.accessToken}`)
        .expect(200, {
          address: data.address,
          number: data.number,
          complement: data.complement,
          district: data.district,
          city: data.city,
          cityId: data.cityId,
          state: data.state,
          country: data.country,
          zip: data.zip
        })
    })

    test('Should return 200 with no body on success if not exists', async () => {
      await request(app)
        .get('/address')
        .set('authorization', `Bearer ${mockAccessToken().accessToken}`)
        .expect(200, null)
    })

    test('Should return 401 if token is not provided', async () => {
      await request(app)
        .get('/address')
        .expect(401)
    })
  })
})
