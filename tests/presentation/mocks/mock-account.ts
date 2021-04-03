import { AddAccount, VerifyAccount, LoadAccountsByStatus } from '@/domain/usecases'
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
