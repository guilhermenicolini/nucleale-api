import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
  PasswordValidation,
  TaxIdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['taxId', 'name', 'email', 'password', 'passwordConfirmation', 'mobileCountry', 'mobilePhone', 'birth']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new TaxIdValidation('taxId'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new PasswordValidation('password'))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
