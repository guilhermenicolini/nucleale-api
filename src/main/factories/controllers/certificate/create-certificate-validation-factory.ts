import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation,
  NumberValidation,
  EnumValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'
import { CertificateType } from '@/domain/models'

export const makeCreateCertificateValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['userId', 'procedureId', 'type', 'date']) {
    validations.push(new RequiredFieldValidation(field))
  }
  const idValidatioAdapter = new IdValidatorAdapter()
  for (const field of ['userId', 'procedureId']) {
    validations.push(new IdValidation(field, idValidatioAdapter))
  }
  validations.push(new EnumValidation('type', CertificateType))
  validations.push(new NumberValidation('date'))
  return new ValidationComposite(validations)
}
