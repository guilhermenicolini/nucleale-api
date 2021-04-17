import {
  ValidationComposite,
  RequiredFieldValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeSaveAddressValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['address', 'number', 'district', 'city', 'cityId', 'state', 'zip', 'country']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new NumberValidation('cityId'))
  return new ValidationComposite(validations)
}
