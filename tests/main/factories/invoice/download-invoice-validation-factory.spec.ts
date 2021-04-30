import { makeDownloadInvoiceValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('DownloadInvoiceValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDownloadInvoiceValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validations.push(new IdValidation('id', new IdValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
