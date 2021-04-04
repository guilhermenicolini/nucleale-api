import {
  ValidationComposite,
  RequiredFieldValidation,
  EnumValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { AccountStatus } from '@/domain/models'

export const makeLoadAccountsByStatusValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('status'))
  validations.push(new EnumValidation('status', AccountStatus))
  return new ValidationComposite(validations)
}
