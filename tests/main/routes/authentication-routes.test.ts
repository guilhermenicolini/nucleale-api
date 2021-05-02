import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { mockAccountModel } from '@/tests/domain/mocks'
import env from '@/main/config/env'

import { Collection } from 'mongodb'
import request from 'supertest'
import faker from 'faker'
import { hash } from 'bcrypt'
import { decode } from 'jsonwebtoken'

const mockAddRequest = () => {
  const password = 'P@ssw0rd'

  return {
    taxId: '30638954070',
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
    mobilePhone: faker.phone.phoneNumber('+55199########'),
    birth: faker.datatype.number({
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

const validateToken = (obj) => {
  return function (res) {
    if (!('accessToken' in res.body)) throw new Error('Missing accessToken')
    const token = decode(res.body.accessToken) as any
    if (token.sub !== obj._id.toString()) throw new Error('Invalid sub')
    if (token.acc !== obj.accountId.toString()) throw new Error('Invalid acc')
    if (token.role !== obj.role) throw new Error('Invalid role')
    if (token.iss !== env.iss) throw new Error('Invalid iss')
    if (token.aud !== env.aud) throw new Error('Invalid aud')
  }
}

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
        .post('/signup')
        .send(mockAddRequest())
        .expect(201)
    })

    test('Should return 400 on signup if body is ivalid', async () => {
      const params = mockAddRequest()
      await accountCollection.insertOne({ email: params.email })
      await request(app)
        .post('/signup')
        .send({})
        .expect(400)
    })

    test('Should return 409 on signup if email was taken', async () => {
      const params = mockAddRequest()
      await accountCollection.insertOne({ email: params.email })
      await request(app)
        .post('/signup')
        .send(params)
        .expect(409)
    })
  })

  describe('POST /login', () => {
    test('Should return 400 on login if body is ivalid', async () => {
      await request(app)
        .post('/login')
        .send({})
        .expect(400)
    })

    test('Should return 401 on login if invalid email or password', async () => {
      await request(app)
        .post('/login')
        .send(mockLoginRequest())
        .expect(401)
    })

    test('Should return 200 on login', async () => {
      const { id, email, password, ...obj } = mockAccountModel()

      const inserted = await accountCollection.insertOne({
        ...obj,
        _id: id,
        email,
        password: await hash(password, 12)
      })
      await request(app)
        .post('/login')
        .send({ email, password })
        .expect(200)
        .expect(validateToken(inserted.ops[0]))
    })
  })

  describe('POST /password-recovery/:email', () => {
    test('Should return 400 on invalid email', async () => {
      await request(app)
        .post('/password-recovery/invalid_email')
        .expect(400)
    })
  })
})
