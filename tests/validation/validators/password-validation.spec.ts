import { PasswordValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = 'any'

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

  test('Should return an error if password does not contains at least 1 lower case character', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'P2345678'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if password does not contains at least 1 upper case character', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'p2345678'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if password does not contains at least 1 numeric character', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'Password'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 'P@ssw0rd' })
    expect(error).toBeFalsy()
  })
})
