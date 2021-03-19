import { AddAccountRepository } from '@/data/protocols'

import faker from 'faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result: AddAccountRepository.Result = ({
    isValid: true,
    accountId: faker.random.uuid(),
    userId: faker.random.uuid()
  })

  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}
