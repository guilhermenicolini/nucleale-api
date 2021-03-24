import { AddAccount, VerifyAccount } from '@/domain/usecases'

import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result: AddAccount.Result = {
    isValid: true,
    accountId: faker.random.uuid(),
    userId: faker.random.uuid()
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
    userId: faker.random.uuid()
  }

  async verify (params: VerifyAccount.Params): Promise<VerifyAccount.Result> {
    this.params = params
    return this.result
  }
}
