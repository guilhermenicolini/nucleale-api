import { AccountMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let userCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.instance.getCollection('users')
    await userCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const data = mockAddAccountParams()
    const result = await sut.add(data)
    expect(result.isValid).toBe(true)
  })
})
