import {
  AddChildren,
  LoadChildrens,
  UpdateChildren,
  DeleteChildren
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

export class UpdateChildrenSpy implements UpdateChildren {
  params: UpdateChildren.Params
  result = true

  async update (params: UpdateChildren.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class DeleteChildrenSpy implements DeleteChildren {
  params: DeleteChildren.Params
  result = true

  async delete (params: DeleteChildren.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
