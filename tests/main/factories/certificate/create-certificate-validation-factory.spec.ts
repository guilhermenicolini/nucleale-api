import { makeCreateCertificateValidation } from '@/main/factories'
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

jest.mock('@/validation/validators/validation-composite')

describe('CreateCertificateValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateCertificateValidation()
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
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
