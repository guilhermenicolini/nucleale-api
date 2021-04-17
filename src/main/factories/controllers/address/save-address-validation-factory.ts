import {
  ValidationComposite,
  RequiredFieldValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeSaveAddressValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('address'))
  validations.push(new RequiredFieldValidation('number'))
  validations.push(new RequiredFieldValidation('district'))
  validations.push(new RequiredFieldValidation('city'))
  validations.push(new RequiredFieldValidation('cityId'))
  validations.push(new RequiredFieldValidation('state'))
  validations.push(new RequiredFieldValidation('zip'))
  validations.push(new RequiredFieldValidation('country'))
  return new ValidationComposite(validations)
}
