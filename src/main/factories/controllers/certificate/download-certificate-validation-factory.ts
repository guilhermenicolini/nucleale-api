import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

export const makeDownloadCertificateValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['accountId', 'hash']) {
    validations.push(new RequiredFieldValidation(field))
  }
  const idValidatioAdapter = new IdValidatorAdapter()
  validations.push(new IdValidation('accountId', idValidatioAdapter))
  return new ValidationComposite(validations)
}
