import { makeDownloadCertificateValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('DownloadCertificateValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDownloadCertificateValidation()
    const validations: Validation[] = []
    for (const field of ['accountId', 'hash']) {
      validations.push(new RequiredFieldValidation(field))
    }
    const idValidatioAdapter = new IdValidatorAdapter()
    validations.push(new IdValidation('accountId', idValidatioAdapter))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
