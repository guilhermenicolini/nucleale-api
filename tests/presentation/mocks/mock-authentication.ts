import { AccountModel } from '@/domain/models'
import { Authentication, GeneratePasswordRecoveryLink } from '@/domain/usecases'

import faker from 'faker'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result: Authentication.Result = {
    accessToken: faker.datatype.uuid()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class GeneratePasswordRecoveryLinkSpy implements GeneratePasswordRecoveryLink {
  account: AccountModel

  async generate (account: AccountModel): Promise<void> {
    this.account = account
  }
}
