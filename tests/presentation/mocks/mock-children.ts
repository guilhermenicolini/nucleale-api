import {
  AddChildren,
  LoadChildrens
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

export class LoadChildrensSpy implements LoadChildrens {
  accountId: string
  result = []

  async load (accountId: string): Promise<LoadChildrens.Result> {
    this.accountId = accountId
    return this.result
  }
}
