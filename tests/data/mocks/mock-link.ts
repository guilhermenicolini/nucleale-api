import { AddLinkRepository, LoadLinkRepository } from '@/data/protocols'
import { mockLinkModel } from '@/tests/domain/mocks/mock-link'

import faker from 'faker'
import moment from 'moment-timezone'

export class AddLinkRepositorySpy implements AddLinkRepository {
  data: AddLinkRepository.Params
  result: AddLinkRepository.Result = {
    link: faker.datatype.uuid(),
    expiration: moment().add(1, 'hour').valueOf()
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
