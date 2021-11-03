import {
  ValidationComposite,
  RequiredFieldValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeLoadAddressByZipValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('zip'))
  validations.push(new NumberValidation('zip'))
  return new ValidationComposite(validations)
}
