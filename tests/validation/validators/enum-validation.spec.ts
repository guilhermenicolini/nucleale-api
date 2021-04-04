import { EnumValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

const field = faker.random.word()

enum TestEnumSpy {
  ok = 'any_value'
}

const makeSut = (): EnumValidation => {
  return new EnumValidation(field, TestEnumSpy)
}

describe('EnumValidation', () => {
  test('Should return an error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
