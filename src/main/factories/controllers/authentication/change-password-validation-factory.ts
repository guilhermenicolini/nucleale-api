import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  PasswordValidation,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

export const makeChangePasswordValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['token', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new IdValidation('token', new IdValidatorAdapter()))
  validations.push(new PasswordValidation('password'))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
