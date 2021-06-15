import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

export const makeCreateInvoiceValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['userId', 'procedureId', 'amount']) {
    validations.push(new RequiredFieldValidation(field))
  }
  const idValidatioAdapter = new IdValidatorAdapter()
  for (const field of ['userId', 'procedureId']) {
    validations.push(new IdValidation(field, idValidatioAdapter))
  }
  validations.push(new NumberValidation('amount'))
  return new ValidationComposite(validations)
}
