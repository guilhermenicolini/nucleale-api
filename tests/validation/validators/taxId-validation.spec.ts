import { TaxIdValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

const field = faker.random.word()

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

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const value = '28579699029'
    const error = sut.validate({
      [field]: value
    })
    expect(error).toBeFalsy()
  })
})
