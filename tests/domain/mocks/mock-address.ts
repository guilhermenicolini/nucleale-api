import { AddressModel } from '@/domain/models'
import { LoadAddressByZip } from '@/domain/usecases'
import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockAddressModel = (accountId?: any): AddressModel => ({
  id: new ObjectId().toString(),
  accountId: accountId || new ObjectId().toString(),
  address: faker.address.streetName(),
  number: faker.datatype.number(1000).toString(),
  complement: faker.random.word(),
  district: faker.random.word(),
  city: faker.address.city(),
  cityId: faker.datatype.number({ min: 1000, max: 9999 }),
  state: faker.address.stateAbbr(),
  country: faker.address.countryCode(),
  zip: faker.address.zipCode('########')
})

export const mockAddAddressModel = (accountId?: string): Omit<AddressModel, 'id'> => ({
  accountId: accountId || new ObjectId().toString(),
  address: faker.address.streetName(),
  number: faker.datatype.number(1000).toString(),
  complement: faker.random.word(),
  district: faker.random.word(),
  city: faker.address.city(),
  cityId: faker.datatype.number({ min: 1000, max: 9999 }),
  state: faker.address.stateAbbr(),
  country: faker.address.countryCode(),
  zip: faker.address.zipCode('########')
})

export const mockRemoteAddressModel = (): LoadAddressByZip.Result => ({
  address: faker.address.streetName(),
  district: faker.random.word(),
  city: faker.address.city(),
  state: faker.address.stateAbbr()
})
