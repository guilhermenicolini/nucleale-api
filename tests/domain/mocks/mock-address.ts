import { AddressModel } from '@/domain/models'
import faker, { random } from 'faker'
import { ObjectId } from 'mongodb'

export const mockAddressModel = (): AddressModel => ({
  accountId: new ObjectId().toString(),
  address: faker.address.streetName(),
  number: random.number(1000).toString(),
  complement: faker.random.word(),
  district: faker.random.word(),
  city: faker.address.city(),
  cityId: random.number({ min: 1000, max: 9999 }),
  state: faker.address.stateAbbr(),
  country: faker.address.countryCode(),
  zip: faker.address.zipCode('########')
})
