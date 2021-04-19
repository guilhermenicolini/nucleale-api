import {
  AddChildrenRepository,
  LoadChildrensRepository
} from '@/data/protocols'
import { mockResultChildrenModel } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddChildrenRepositorySpy implements AddChildrenRepository {
  params: AddChildrenRepository.Params
  result = faker.random.uuid()

  async add (params: AddChildrenRepository.Params): Promise<string> {
    this.params = params
    return this.result
  }
}

export class LoadChildrensRepositorySpy implements LoadChildrensRepository {
  accountId: string
  result: LoadChildrensRepository.Result = [
    mockResultChildrenModel(),
    mockResultChildrenModel()
  ]

  async load (accountId: string): Promise<LoadChildrensRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}