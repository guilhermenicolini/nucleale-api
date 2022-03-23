import { ZipValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = 'any'

const makeSut = (): ZipValidation => {
  return new ZipValidation(field)
}

describe('ZipValidation', () => {
  test('Should return an error if zip does not contains 8 characters', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: '1234567'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if zip does not contains all number characters', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: '12345-78'
    })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: '12345678' })
    expect(error).toBeFalsy()
  })
})
