import { AccountStatus } from '@/domain/models'
import { AccountMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddAccountParams, mockAddressModel, mockChildrenModel, mockDbAccountModel, mockInvitation, mockSaveAccountParams } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection
let addressesCollection: Collection
let childrensCollection: Collection
let invitationCollection: Collection

describe('AccountMongoRepository2', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.instance.getCollection('accounts')
    invitationCollection = await MongoHelper.instance.getCollection('invitations')
    addressesCollection = await MongoHelper.instance.getCollection('addresses')
    childrensCollection = await MongoHelper.instance.getCollection('childrens')
    await accountCollection.deleteMany({})
    await invitationCollection.deleteMany({})
    await addressesCollection.deleteMany({})
    await childrensCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const result = await sut.add(data)
      expect(result.isValid).toBe(true)
    })

    test('Should delete invitation and return an account on success', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      await invitationCollection.insertOne({ accountId: 'any_id', email: data.email })
      const result = await sut.add(data)
      const total = await invitationCollection.find({}).toArray()
      expect(result.isValid).toBe(true)
      expect(total.length).toBe(0)
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
      expect(account.id).toBe(inserted.userId)
      expect(account.password).toBe(data.password)
    })

    test('Should return null if account does not exists', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const account = await sut.load(data.email)
      expect(account).toBeFalsy()
    })
  })

  describe('loadByStatus()', () => {
    test('Should return account with correct values', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const inserted = await sut.add(data)
      const accounts = await sut.loadByStatus(AccountStatus.awaitingVerification)
      expect(accounts.length).toBe(1)
      expect(accounts[0].id).toBe(inserted.userId)
      expect(accounts[0].accountId).toBe(data.accountId)
      expect(accounts[0].birth).toBe(data.birth)
      expect(accounts[0].email).toBe(data.email)
      expect(accounts[0].mobilePhone).toBe(data.mobilePhone)
      expect(accounts[0].name).toBe(data.name)
      expect(accounts[0].status).toBe(data.status)
      expect(accounts[0].taxId).toBe(data.taxId)
    })

    test('Should return empty array if no records found', async () => {
      const sut = makeSut()
      const accounts = await sut.loadByStatus(AccountStatus.awaitingVerification)
      expect(accounts.length).toBe(0)
    })
  })

  describe('loadInvitation()', () => {
    test('Should return an account if invitation exists', async () => {
      const sut = makeSut()
      const data = mockInvitation()
      invitationCollection.insertOne(data)
      const accountId = await sut.loadInvitation(data.email)
      expect(accountId).toBe(data.accountId)
    })

    test('Should return null if invitation does not exists', async () => {
      const sut = makeSut()
      const accountId = await sut.loadInvitation('any_email@mail.com')
      expect(accountId).toBeFalsy()
    })
  })

  describe('loadById()', () => {
    test('Should return account if exists', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const inserted = await sut.add(data)
      const account = await sut.loadById(inserted.userId)
      expect(account.id).toBe(inserted.userId)
      expect(account.accountId).toBe(data.accountId)
      expect(account.birth).toBe(data.birth)
      expect(account.email).toBe(data.email)
      expect(account.mobilePhone).toBe(data.mobilePhone)
      expect(account.name).toBe(data.name)
      expect(account.status).toBe(data.status)
      expect(account.taxId).toBe(data.taxId)
    })

    test('Should return null if not exists', async () => {
      const sut = makeSut()
      const account = await sut.loadById(new ObjectId().toString())
      expect(account).toBeFalsy()
    })

    test('Should throw if userId is mongo id', async () => {
      const sut = makeSut()
      const promise = sut.loadById('any_id')
      expect(promise).rejects.toThrow()
    })
  })

  test('Should update all fields', async () => {
    const sut = makeSut()
    const inserted = await sut.add(mockAddAccountParams())
    const update = mockSaveAccountParams()
    await sut.save(inserted.userId, update)
    const account = await sut.loadById(inserted.userId)
    expect(account.id).toBe(inserted.userId)
    expect(account.accountId).toBe(update.accountId)
    expect(account.birth).toBe(update.birth)
    expect(account.email).toBe(update.email)
    expect(account.mobilePhone).toBe(update.mobilePhone)
    expect(account.name).toBe(update.name)
    expect(account.status).toBe(update.status)
    expect(account.taxId).toBe(update.taxId)
  })

  describe('inviteAccount()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut()
      const accountId = new ObjectId().toString()
      const email = 'mail@inbox.me'
      const result = await sut.inviteAccount(accountId, email)
      const invitations = await invitationCollection.find({}).toArray()
      expect(result).toBe(true)
      expect(invitations.length).toBe(1)
      expect(invitations[0].accountId.toString()).toBe(accountId)
      expect(invitations[0].email).toBe(email)
    })

    test('Should return false if email exists', async () => {
      const sut = makeSut()
      const email = 'mail@inbox.me'
      await accountCollection.insertOne({ email })
      const result = await sut.inviteAccount(new ObjectId().toString(), email)
      const invitations = await invitationCollection.find({}).toArray()
      expect(result).toBe(false)
      expect(invitations.length).toBe(0)
    })

    test('Should update accountId if invitation already exists', async () => {
      const sut = makeSut()
      const oldAccountId = new ObjectId().toString()
      const accountId = new ObjectId().toString()
      const email = 'mail@inbox.me'
      await invitationCollection.insertOne({ oldAccountId, email })
      const result = await sut.inviteAccount(accountId, email)
      const invitations = await invitationCollection.find({}).toArray()
      expect(result).toBe(true)
      expect(invitations.length).toBe(1)
      expect(invitations[0].accountId.toString()).toBe(accountId)
      expect(invitations[0].email).toBe(email)
    })
  })

  describe('loadAll()', () => {
    test('Should return empty array if no records found', async () => {
      const sut = makeSut()
      const accounts = await sut.loadAll(new ObjectId().toString(), new ObjectId().toString())
      expect(accounts.length).toBe(0)
    })

    test('Should return accounts that isnt the current user', async () => {
      const sut = makeSut()
      const userId = new ObjectId()
      const accountId = new ObjectId()
      await accountCollection.insertMany([mockDbAccountModel(userId, accountId), mockDbAccountModel(null, accountId)])
      const accounts = await sut.loadAll(accountId.toString(), userId.toString())
      expect(accounts.length).toBe(1)
    })
  })

  describe('search()', () => {
    test('Should return empty array if no records found', async () => {
      const sut = makeSut()
      const accounts = await sut.search('any words')
      expect(accounts.length).toBe(0)
    })

    test('Should return empty array if no term is provided', async () => {
      const sut = makeSut()
      const accounts = await sut.search(null)
      expect(accounts.length).toBe(0)
    })

    const createData = async (name: string, address: boolean = true): Promise<void> => {
      const accountId = new ObjectId()
      const account = mockDbAccountModel(null, accountId)
      account.name = name

      await accountCollection.insertMany([account, mockDbAccountModel(null, accountId)])
      if (address) {
        await addressesCollection.insertOne(mockAddressModel(accountId))
      }
      await childrensCollection.insertOne(mockChildrenModel(accountId.toString()))
    }

    test('Should return all accounts', async () => {
      const sut = makeSut()
      const name = 'any_name'

      await createData(name)
      await createData(name, false)

      const accounts = await sut.search(name.split(' ')[0].toLowerCase())
      expect(accounts.length).toBe(2)
    })
  })
})
