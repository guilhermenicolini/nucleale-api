import { GenerateToken } from '@/domain/usecases'

import faker from 'faker'

export class GenerateTokenSpy implements GenerateToken {
  params: GenerateToken.Params
  result: GenerateToken.Result = faker.random.uuid()

  generate (params: GenerateToken.Params): GenerateToken.Result {
    this.params = params
    return this.result
  }
}
