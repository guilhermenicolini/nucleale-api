import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

export const makeCheckPasswordRequestValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('token'))
  validations.push(new IdValidation('token', new IdValidatorAdapter()))
  return new ValidationComposite(validations)
}
