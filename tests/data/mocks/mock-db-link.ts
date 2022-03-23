import { AddLinkRepository, LoadLinkRepository, DeleteLinkRepository } from '@/data/protocols'
import { mockLinkModel } from '@/tests/domain/mocks/mock-link'

export class AddLinkRepositorySpy implements AddLinkRepository {
  data: AddLinkRepository.Params
  result: AddLinkRepository.Result = {
    link: 'any_id',
    expiration: 1747982564066
  }

  async add (data: AddLinkRepository.Params): Promise<AddLinkRepository.Result> {
    this.data = data
    return this.result
  }
}

export class LoadLinkRepositorySpy implements LoadLinkRepository {
  params: LoadLinkRepository.Params
  result: LoadLinkRepository.Result = mockLinkModel()

  async load (params: LoadLinkRepository.Params): Promise<LoadLinkRepository.Result> {
    this.params = params
    return this.result
  }
}

export class DeleteLinkRepositorySpy implements DeleteLinkRepository {
  token: string

  async delete (token: string): Promise<void> {
    this.token = token
  }
}
