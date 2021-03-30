import {
  ValidationComposite,
  BrazilPhoneValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeMobilePhoneValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new BrazilPhoneValidation('mobilePhone'))
  return new ValidationComposite(validations)
}
