import { MobileValidationComposite } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { PhoneValidatorSpy } from '@/tests/validation/mocks'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: MobileValidationComposite
  validationSpies: PhoneValidatorSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new PhoneValidatorSpy(),
    new PhoneValidatorSpy()
  ]
  const sut = new MobileValidationComposite(field, validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('MobileValidation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new InvalidParamError(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(validationSpies[1].error)
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new InvalidParamError(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(validationSpies[0].error)
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
