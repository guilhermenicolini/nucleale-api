import {
  ValidationComposite,
  RequiredFieldValidation,
  ZipValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeLoadAddressByZipValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('zip'))
  validations.push(new ZipValidation('zip'))
  return new ValidationComposite(validations)
}
