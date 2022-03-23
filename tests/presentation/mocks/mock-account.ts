import {
  AddAccount,
  VerifyAccount,
  LoadAccountsByStatus,
  LoadAccountByToken,
  LoadInvitation,
  LoadAccount,
  SaveAccount,
  InviteAccount,
  LoadAccountByEmail,
  LoadAccounts,
  SearchAccounts
} from '@/domain/usecases'
import { mockAccountModel, mockSearchAccountResult } from '@/tests/domain/mocks'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result: AddAccount.Result = {
    isValid: true,
    accountId: 'any_id',
    userId: 'any_id',
    role: 'any'
  }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class VerifyAccountSpy implements VerifyAccount {
  params: VerifyAccount.Params
  result: VerifyAccount.Result = {
    accountId: 'any_id',
    userId: 'any_id',
    role: 'any'
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
    userId: 'any_id',
    accountId: 'any_id'
  }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

export class LoadInvitationSpy implements LoadInvitation {
  email: string
  result = 'any_id'

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

export class LoadAccountByEmailSpy implements LoadAccountByEmail {
  email: string
  result: LoadAccountByEmail.Result = mockAccountModel()

  async load (email: string): Promise<LoadAccountByEmail.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountsSpy implements LoadAccounts {
  accountId: string
  userId: string
  result: LoadAccounts.Result = [mockAccountModel(), mockAccountModel()]

  async loadAll (accountId: string, userId: string): Promise<LoadAccounts.Result> {
    this.accountId = accountId
    this.userId = userId
    return this.result
  }
}

export class SearchAccountsSpy implements SearchAccounts {
  term: string
  result: SearchAccounts.Result = [mockSearchAccountResult(), mockSearchAccountResult()]

  async search (term: string): Promise<SearchAccounts.Result> {
    this.term = term
    return this.result
  }
}
