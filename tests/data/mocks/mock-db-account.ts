import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountsByStatusRepository,
  LoadInvitationRepository,
  LoadAccountRepository,
  SaveAccountRepository,
  InviteAccountRepository,
  LoadAccountsRepository,
  SearchAccountsRepository
} from '@/data/protocols'
import { LoadAccountsByStatus, SaveAccount } from '@/domain/usecases'
import { mockAccountModel, mockSearchAccountResult } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result: AddAccountRepository.Result = ({
    isValid: true,
    accountId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    role: faker.random.word()
  })

  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async check (email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result: LoadAccountByEmailRepository.Result = mockAccountModel()

  async load (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountsByStatusRepositorySpy implements LoadAccountsByStatus {
  params: LoadAccountsByStatusRepository.Params
  result: LoadAccountsByStatusRepository.Result = [
    mockAccountModel(),
    mockAccountModel()
  ]

  async loadByStatus (params: LoadAccountsByStatusRepository.Params): Promise<LoadAccountsByStatusRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadInvitationRepositorySpy implements LoadInvitationRepository {
  email: string
  result = faker.datatype.uuid()

  async loadInvitation (email: string): Promise<string> {
    this.email = email
    return this.result
  }
}

export class LoadAccountRepositorySpy implements LoadAccountRepository {
  userId: string
  result: LoadAccountRepository.Result = mockAccountModel()

  async loadById (userId: string): Promise<LoadAccountRepository.Result> {
    this.userId = userId
    return this.result
  }
}

export class SaveAccountRepositorySpy implements SaveAccountRepository {
  userId: string
  data: SaveAccount.Params

  async save (userId: string, data: SaveAccount.Params): Promise<void> {
    this.userId = userId
    this.data = data
  }
}

export class InviteAccountRepositorySpy implements InviteAccountRepository {
  accountId: string
  email: string
  result = true

  async inviteAccount (accountId: string, email: string): Promise<boolean> {
    this.accountId = accountId
    this.email = email
    return this.result
  }
}

export class LoadAccountsRepositorySpy implements LoadAccountsRepository {
  accountId: string
  userId: string
  result: LoadAccountsRepository.Result = [mockAccountModel(), mockAccountModel()]

  async loadAll (accountId: string, userId: string): Promise<LoadAccountsRepository.Result> {
    this.accountId = accountId
    this.userId = userId
    return this.result
  }
}

export class SearchAccountsRepositorySpy implements SearchAccountsRepository {
  term: string
  result: SearchAccountsRepository.Result = [mockSearchAccountResult(), mockSearchAccountResult()]

  async search (term: string): Promise<SearchAccountsRepository.Result> {
    this.term = term
    return this.result
  }
}
