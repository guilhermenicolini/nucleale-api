import {
  ValidationComposite,
  RequiredFieldValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeAddChildrenValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'birth', 'gender']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new NumberValidation('birth'))
  return new ValidationComposite(validations)
}
