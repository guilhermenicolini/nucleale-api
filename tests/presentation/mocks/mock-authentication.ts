import { AccountModel } from '@/domain/models'
import {
  Authentication,
  GeneratePasswordRecoveryLink,
  CheckAccountLink,
  ChangePassword
} from '@/domain/usecases'

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

export class CheckAccountLinkSpy implements CheckAccountLink {
  token: string
  result: CheckAccountLink.Result = true

  async check (token: string): Promise<CheckAccountLink.Result> {
    this.token = token
    return this.result
  }
}

export class ChangePasswordSpy implements ChangePassword {
  params: ChangePassword.Params
  result: ChangePassword.Result = null

  async change (params: ChangePassword.Params): Promise<ChangePassword.Result> {
    this.params = params
    return this.result
  }
}
