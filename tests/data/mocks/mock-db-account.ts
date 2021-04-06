import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountsByStatusRepository,
  LoadInvitationRepository
} from '@/data/protocols'
import { LoadAccountsByStatus } from '@/domain/usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result: AddAccountRepository.Result = ({
    isValid: true,
    accountId: faker.random.uuid(),
    userId: faker.random.uuid(),
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
  result: LoadAccountByEmailRepository.Result = {
    accountId: faker.random.uuid(),
    userId: faker.random.uuid(),
    password: faker.internet.password(),
    role: faker.random.word()
  }

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
  result = faker.random.uuid()

  async loadInvitation (email: string): Promise<string> {
    this.email = email
    return this.result
  }
}
