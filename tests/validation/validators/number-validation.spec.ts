import { NumberValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = 'any'

const makeSut = (): NumberValidation => {
  return new NumberValidation(field)
}

describe('NumberValidation', () => {
  test('Should return an error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: 'any' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 123 })
    expect(error).toBeFalsy()
  })
})
