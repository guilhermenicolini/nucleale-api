import {
  ValidationComposite,
  RequiredFieldValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeSendWhatsappMessageValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['mobilePhone', 'message']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
