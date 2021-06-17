import {
  ValidationComposite,
  RequiredFieldValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeResendInvoiceValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('invoiceNo'))
  validations.push(new NumberValidation('invoiceNo'))
  return new ValidationComposite(validations)
}
