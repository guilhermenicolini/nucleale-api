import { PasswordValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

const field = faker.random.word()

const makeSut = (): PasswordValidation => {
  return new PasswordValidation(field)
}

describe('PasswordValidation', () => {
  test('Should return an error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: ''
    })
    expect(error).toEqual(new InvalidParamError(field))
  })
})
