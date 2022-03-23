import {
  AddChildrenRepository,
  LoadChildrensRepository,
  UpdateChildrenRepository,
  DeleteChildrenRepository
} from '@/data/protocols'
import { mockResultChildrenModel } from '@/tests/domain/mocks'

export class AddChildrenRepositorySpy implements AddChildrenRepository {
  params: AddChildrenRepository.Params
  result = 'any_id'

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

export class UpdateChildrenRepositorySpy implements UpdateChildrenRepository {
  params: UpdateChildrenRepository.Params
  result = true

  async update (params: UpdateChildrenRepository.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class DeleteChildrenRepositorySpy implements DeleteChildrenRepository {
  params: DeleteChildrenRepository.Params
  result = true

  async delete (params: DeleteChildrenRepository.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
