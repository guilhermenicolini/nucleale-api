import { NumberValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

const field = faker.random.word()

const makeSut = (): NumberValidation => {
  return new NumberValidation(field)
}

describe('NumberValidation', () => {
  test('Should return an error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: faker.random.word() })
    expect(error).toEqual(new InvalidParamError(field))
  })
})
