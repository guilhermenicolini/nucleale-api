import {
  AddAccount,
  VerifyAccount,
  LoadAccountsByStatus,
  LoadAccountByToken,
  LoadInvitation,
  LoadAccount,
  SaveAccount
} from '@/domain/usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result: AddAccount.Result = {
    isValid: true,
    accountId: faker.random.uuid(),
    userId: faker.random.uuid(),
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
    accountId: faker.random.uuid(),
    userId: faker.random.uuid(),
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
    userId: faker.random.uuid(),
    accountId: faker.random.uuid()
  }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

export class LoadInvitationSpy implements LoadInvitation {
  email: string
  result = faker.random.uuid()

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
