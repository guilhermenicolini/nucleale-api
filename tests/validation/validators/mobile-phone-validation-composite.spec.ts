import { MobilePhoneValidationComposite } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { MobilePhoneValidatorSpy } from '@/tests/validation/mocks'

const field = 'any'

type SutTypes = {
  sut: MobilePhoneValidationComposite
  validationSpies: MobilePhoneValidatorSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new MobilePhoneValidatorSpy(),
    new MobilePhoneValidatorSpy()
  ]
  const sut = new MobilePhoneValidationComposite(field, validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('MobilePhoneValidation Composite', () => {
  test('Should return an error if any validation returns false', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].isMobilePhoneValid = false
    const error = sut.validate({ [field]: '+5519998765432' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: '+5519998765432' })
    expect(error).toBeFalsy()
  })
})
