import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

export const makeDeleteChildrenValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new IdValidation('id', new IdValidatorAdapter()))
  return new ValidationComposite(validations)
}
