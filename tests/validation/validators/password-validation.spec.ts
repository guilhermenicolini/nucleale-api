import { PasswordValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

const field = faker.random.word()

const makeSut = (): PasswordValidation => {
  return new PasswordValidation(field)
}

describe('PasswordValidation', () => {
  test('Should return an error if password does not contains at least 8 characters', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'pass123'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 'P@ssw0rd' })
    expect(error).toBeFalsy()
  })
})
