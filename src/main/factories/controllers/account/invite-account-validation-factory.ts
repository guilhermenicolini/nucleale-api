import {
  ValidationComposite,
  IdValidation,
  EmailValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter, EmailValidatorAdapter } from '@/infra/validators'

export const makeInviteAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new IdValidation('accountId', new IdValidatorAdapter()))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
