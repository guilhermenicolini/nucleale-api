import { TaxIdValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = 'any'

const makeSut = (): TaxIdValidation => {
  return new TaxIdValidation(field)
}

describe('TaxIdValidation', () => {
  test('Should return an error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'any_field'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if taxId is invalid', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: '9813549203'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if taxId is in black list', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: '33333333333'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds with CPF with % 2 > 0', () => {
    const sut = makeSut()
    const value = '28579699029'
    const error = sut.validate({
      [field]: value
    })
    expect(error).toBeFalsy()
  })

  test('Should not return if validation succeeds with CPF with % 2 = 0', () => {
    const sut = makeSut()
    const value = '27723130007'
    const error = sut.validate({
      [field]: value
    })
    expect(error).toBeFalsy()
  })
})
