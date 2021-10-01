import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  PasswordValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeChangePasswordValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['token', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new PasswordValidation('password'))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
