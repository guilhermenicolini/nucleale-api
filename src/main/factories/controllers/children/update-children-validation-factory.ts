import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

export const makeUpdateChildrenValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'name', 'birth', 'gender']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new IdValidation('id', new IdValidatorAdapter()))
  validations.push(new NumberValidation('birth'))
  return new ValidationComposite(validations)
}
