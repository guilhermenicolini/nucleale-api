import { AddLinkRepository } from '@/data/protocols'

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
