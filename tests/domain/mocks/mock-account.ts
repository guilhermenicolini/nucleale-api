import { AccountStatus, AccountModel, AccountRoles } from '@/domain/models'
import { AddAccount, VerifyAccount, LoadAccountsByStatus, SaveAccount } from '@/domain/usecases'
import { SignUpController } from '@/presentation/controllers'
import { ObjectId } from 'mongodb'
import { mockAddressModel } from './mock-address'

export const mockAddAccountParams = (): AddAccount.Params => ({
  accountId: new ObjectId().toString(),
  taxId: '32051856095',
  name: 'any_name',
  email: 'mail@inbox.me',
  password: 'P@ssw0rd',
  mobilePhone: '+5519998765432',
  birth: 315543600000,
  status: AccountStatus.awaitingVerification,
  role: 'user'
})

export const mockSignUpRequest = (): SignUpController.Request => ({
  taxId: '32051856095',
  name: 'any_name',
  email: 'mail@inbox.me',
  password: 'P@ssw0rd',
  passwordConfirmation: 'P@ssw0rd',
  mobilePhone: '+5519998765432',
  birth: 315543600000
})

export const mockSaveAccountParams = (): SaveAccount.Params => ({
  accountId: new ObjectId().toString(),
  taxId: '32051856095',
  name: 'any_name',
  email: 'mail@inbox.me',
  mobilePhone: '+5519998765432',
  birth: 315543600000,
  status: AccountStatus.active,
  role: AccountRoles.admin
})

export const mockVerifyAccountParams = (): VerifyAccount.Params => ({
  email: 'mail@inbox.me',
  password: 'P@ssw0rd'
})

export const mockLoadAccountsByStatusParams = (): LoadAccountsByStatus.Params => (AccountStatus.active)

export const mockAccountModel = (): AccountModel => ({
  id: new ObjectId().toString(),
  accountId: new ObjectId().toString(),
  taxId: '32051856095',
  name: 'any_name',
  email: 'mail@inbox.me',
  mobilePhone: '+5519998765432',
  birth: 315543600000,
  password: 'P@ssw0rd',
  status: AccountStatus.awaitingVerification,
  role: AccountRoles.user
})

export const mockDbAccountModel = (id, accountId) => ({
  _id: id || new ObjectId(),
  accountId: accountId || new ObjectId(),
  taxId: '32051856095',
  name: 'any_name',
  email: 'mail@inbox.me',
  mobilePhone: '+5519998765432',
  birth: 315543600000,
  password: 'P@ssw0rd',
  status: AccountStatus.awaitingVerification,
  role: AccountRoles.user
})

export const mockInvitation = (): any => ({
  accountId: 'any_id',
  email: 'mail@inbox.me'
})

export const mockSearchAccountResult = (): any => ({
  accounts: [mockAccountModel(), mockAccountModel()],
  addresss: mockAddressModel()
})
