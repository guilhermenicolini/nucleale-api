import {
  AddChildren
} from '@/domain/usecases'

import faker from 'faker'

export class AddChildrenSpy implements AddChildren {
  params: AddChildren.Params
  result = faker.random.uuid()

  async add (params: AddChildren.Params): Promise<string> {
    this.params = params
    return this.result
  }
}
