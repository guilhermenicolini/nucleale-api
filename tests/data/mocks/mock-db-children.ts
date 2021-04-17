import {
  AddChildrenRepository
} from '@/data/protocols'

import faker from 'faker'

export class AddChildrenRepositorySpy implements AddChildrenRepository {
  params: AddChildrenRepository.Params
  result = faker.random.uuid()

  async add (params: AddChildrenRepository.Params): Promise<string> {
    this.params = params
    return this.result
  }
}
