import { AccountStatus, AccountModel, AccountRoles } from '@/domain/models'
import { AddAccount, VerifyAccount, LoadAccountsByStatus, SaveAccount } from '@/domain/usecases'
import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockAddAccountParams = (): AddAccount.Params => ({
  accountId: new ObjectId().toString(),
  taxId: faker.address.zipCode('###########'),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: 'P@ssw0rd',
  mobilePhone: faker.phone.phoneNumber('+55##9########'),
  birth: faker.datatype.number({
    min: 315543600000,
    max: 631159200000
  }),
  status: AccountStatus.awaitingVerification,
  role: 'user'
})

export const mockSaveAccountParams = (): SaveAccount.Params => ({
  accountId: new ObjectId().toString(),
  taxId: faker.address.zipCode('###########'),
  name: faker.name.findName(),
  email: faker.internet.email(),
  mobilePhone: faker.phone.phoneNumber('+55##9########'),
  birth: faker.datatype.number({
    min: 315543600000,
    max: 631159200000
  }),
  status: AccountStatus.active,
  role: AccountRoles.admin
})

export const mockVerifyAccountParams = (): VerifyAccount.Params => ({
  email: faker.internet.email(),
  password: 'P@ssw0rd'
})

export const mockLoadAccountsByStatusParams = (): LoadAccountsByStatus.Params => (AccountStatus.active)

export const mockAccountModel = (): AccountModel => ({
  id: new ObjectId().toString(),
  accountId: new ObjectId().toString(),
  taxId: faker.address.zipCode('###########'),
  name: faker.name.findName(),
  email: faker.internet.email(),
  mobilePhone: faker.phone.phoneNumber(),
  birth: faker.datatype.number({
    min: 315543600000,
    max: 631159200000
  }),
  password: faker.internet.password(),
  status: AccountStatus.awaitingVerification,
  role: AccountRoles.user
})

export const mockInvitation = (): any => ({
  accountId: faker.datatype.uuid(),
  email: faker.internet.email()
})
