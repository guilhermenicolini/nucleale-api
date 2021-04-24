import {
  AddAccount,
  VerifyAccount,
  LoadAccountsByStatus,
  LoadAccountByToken,
  LoadInvitation,
  LoadAccount,
  SaveAccount,
  InviteAccount
} from '@/domain/usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result: AddAccount.Result = {
    isValid: true,
    accountId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    role: faker.random.word()
  }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class VerifyAccountSpy implements VerifyAccount {
  params: VerifyAccount.Params
  result: VerifyAccount.Result = {
    accountId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    role: faker.random.word()
  }

  async verify (params: VerifyAccount.Params): Promise<VerifyAccount.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountsByStatusSpy implements LoadAccountsByStatus {
  params: LoadAccountsByStatus.Params
  result: LoadAccountsByStatus.Result = [
    mockAccountModel(),
    mockAccountModel()
  ]

  async loadByStatus (params: LoadAccountsByStatus.Params): Promise<LoadAccountsByStatus.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string
  result: LoadAccountByToken.Result = {
    isValid: true,
    userId: faker.datatype.uuid(),
    accountId: faker.datatype.uuid()
  }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

export class LoadInvitationSpy implements LoadInvitation {
  email: string
  result = faker.datatype.uuid()

  async load (email: string): Promise<string> {
    this.email = email
    return this.result
  }
}

export class LoadAccountSpy implements LoadAccount {
  userId: string
  result: LoadAccount.Result = mockAccountModel()

  async load (userId: string): Promise<LoadAccount.Result> {
    this.userId = userId
    return this.result
  }
}

export class SaveAccountSpy implements SaveAccount {
  userId: string
  data: SaveAccount.Params

  async save (userId: string, data: SaveAccount.Params): Promise<void> {
    this.userId = userId
    this.data = data
  }
}

export class InviteAccountSpy implements InviteAccount {
  accountId: string
  email: string
  result = true

  async invite (accountId: string, email: string): Promise<boolean> {
    this.accountId = accountId
    this.email = email
    return this.result
  }
}
