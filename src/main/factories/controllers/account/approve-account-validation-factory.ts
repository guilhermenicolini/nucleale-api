import {
  ValidationComposite,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

export const makeApproveAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new IdValidation('id', new IdValidatorAdapter()))
  return new ValidationComposite(validations)
}
