import { AddressMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddressModel } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

const makeSut = (): AddressMongoRepository => {
  return new AddressMongoRepository()
}

let addressesCollection: Collection

describe('AddressMongoRepository', () => {
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

  describe('save()', () => {
    test('Should add on success', async () => {
      const sut = makeSut()
      const data = mockAddressModel()
      await sut.save(data)
      const addresses = await addressesCollection.find({}).toArray()
      expect(addresses.length).toBe(1)
      expect(addresses[0]._id).toBeTruthy()
      expect(addresses[0].accountId.toString()).toBe(data.accountId)
      expect(addresses[0].address).toBe(data.address)
      expect(addresses[0].number).toBe(data.number)
      expect(addresses[0].complement).toBe(data.complement)
      expect(addresses[0].district).toBe(data.district)
      expect(addresses[0].city).toBe(data.city)
      expect(addresses[0].cityId).toBe(data.cityId)
      expect(addresses[0].state).toBe(data.state)
      expect(addresses[0].country).toBe(data.country)
      expect(addresses[0].zip).toBe(data.zip)
    })

    test('Should update on success', async () => {
      const sut = makeSut()
      let data = mockAddressModel()
      await sut.save(data)
      data = mockAddressModel(data.accountId)
      await sut.save(data)
      const addresses = await addressesCollection.find({}).toArray()
      expect(addresses.length).toBe(1)
      expect(addresses[0]._id).toBeTruthy()
      expect(addresses[0].accountId.toString()).toBe(data.accountId)
      expect(addresses[0].address).toBe(data.address)
      expect(addresses[0].number).toBe(data.number)
      expect(addresses[0].complement).toBe(data.complement)
      expect(addresses[0].district).toBe(data.district)
      expect(addresses[0].city).toBe(data.city)
      expect(addresses[0].cityId).toBe(data.cityId)
      expect(addresses[0].state).toBe(data.state)
      expect(addresses[0].country).toBe(data.country)
      expect(addresses[0].zip).toBe(data.zip)
    })
  })
})
