import { AccountMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
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

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const result = await sut.add(data)
      expect(result.isValid).toBe(true)
    })
  })

  describe('check()', () => {
    test('Should return true if account exists', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      await accountCollection.insertOne(data)
      const exists = await sut.check(data.email)
      expect(exists).toBe(true)
    })

    test('Should return false if account does not exists', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const exists = await sut.check(data.email)
      expect(exists).toBe(false)
    })
  })

  describe('load()', () => {
    test('Should return an account if exists', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const inserted = await sut.add(data)
      const account = await sut.load(data.email)
      expect(account.accountId).toBe(inserted.accountId)
      expect(account.userId).toBe(inserted.userId)
      expect(account.password).toBe(data.password)
    })

    test('Should return null if account does not exists', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const account = await sut.load(data.email)
      expect(account).toBeFalsy()
    })
  })
})
