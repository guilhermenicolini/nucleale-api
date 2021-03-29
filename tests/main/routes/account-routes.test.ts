import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import request from 'supertest'
import faker from 'faker'
import { hash } from 'bcrypt'

const mockAddRequest = () => {
  const password = 'P@ssw0rd'

  return {
    taxId: '28579699029',
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
    mobileCountry: `+${faker.random.number(99)}`,
    mobilePhone: faker.phone.phoneNumber('###########'),
    birth: faker.random.number({
      min: 315543600000,
      max: 631159200000
    })
  }
}

const mockLoginRequest = () => {
  const password = 'P@ssw0rd'
  return {
    email: faker.internet.email(),
    password
  }
}

let accountCollection: Collection

describe('Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.instance.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 201 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send(mockAddRequest())
        .expect(201)
        .expect(function (res) {
          if (!('accessToken' in res.body)) throw new Error('Missing accessToken')
        })
    })

    test('Should return 400 on signup if body is ivalid', async () => {
      const params = mockAddRequest()
      await accountCollection.insertOne({ email: params.email })
      await request(app)
        .post('/api/signup')
        .send({})
        .expect(400)
    })

    test('Should return 409 on signup if email was taken', async () => {
      const params = mockAddRequest()
      await accountCollection.insertOne({ email: params.email })
      await request(app)
        .post('/api/signup')
        .send(params)
        .expect(409)
    })
  })

  describe('POST /login', () => {
    test('Should return 400 on login if body is ivalid', async () => {
      await request(app)
        .post('/api/login')
        .send({})
        .expect(400)
    })

    test('Should return 401 on login if invalid email or password', async () => {
      await request(app)
        .post('/api/login')
        .send(mockLoginRequest())
        .expect(401)
    })

    test('Should return 200 on login', async () => {
      const data = mockLoginRequest()
      await accountCollection.insertOne({
        accountId: faker.random.uuid(),
        email: data.email,
        password: await hash(data.password, 12)
      })
      await request(app)
        .post('/api/login')
        .send(data)
        .expect(200)
        .expect(function (res) {
          if (!('accessToken' in res.body)) throw new Error('Missing accessToken')
        })
    })
  })
})
