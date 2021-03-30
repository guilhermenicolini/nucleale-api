import { BrazilPhoneValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'
const field = faker.random.word()

const makeSut = (): BrazilPhoneValidation => {
  return new BrazilPhoneValidation(field)
}

describe('BrazilPhone Validation', () => {
  test('Should not return if no phone is provided', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: '+12345678' })
    expect(error).toBeFalsy()
  })

  test('Should not return if is not brazilian phone', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: '+12345678' })
    expect(error).toBeFalsy()
  })

  test('Should return an error if phone is invalid', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: '+55' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if phone has invalid area', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: '+5500998765432' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if phone has invalid 9th digit', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: '+5519898765432' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: '+5519998765432' })
    expect(error).toBeFalsy()
  })
})
