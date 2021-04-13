import { makeSaveAddressValidation } from '@/main/factories'
import {
  ValidationComposite,
  IdValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('ApproveAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveAddressValidation()
    const validations: Validation[] = []
    validations.push(new IdValidation('accountId', new IdValidatorAdapter()))
    validations.push(new RequiredFieldValidation('address'))
    validations.push(new RequiredFieldValidation('number'))
    validations.push(new RequiredFieldValidation('district'))
    validations.push(new RequiredFieldValidation('city'))
    validations.push(new RequiredFieldValidation('cityId'))
    validations.push(new RequiredFieldValidation('state'))
    validations.push(new RequiredFieldValidation('zip'))
    validations.push(new RequiredFieldValidation('country'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})