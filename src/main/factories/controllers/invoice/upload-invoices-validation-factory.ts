import {
  ValidationComposite,
  RequiredFieldValidation,
  FileValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeUploadInvoicesValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['files']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new FileValidation('files', 1, 'xml'))
  return new ValidationComposite(validations)
}
