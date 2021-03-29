import { AddAccount, VerifyAccount } from '@/domain/usecases'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockAddAccountParams = (): AddAccount.Params => ({
  accountId: new ObjectId().toString(),
  taxId: faker.address.zipCode('###########'),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: 'P@ssw0rd',
  mobileCountry: `+${faker.random.number(99)}`,
  mobilePhone: faker.phone.phoneNumber('###########'),
  birth: faker.random.number({
    min: 315543600000,
    max: 631159200000
  })
})

export const mockVerifyAccountParams = (): VerifyAccount.Params => ({
  email: faker.internet.email(),
  password: 'P@ssw0rd'
})
