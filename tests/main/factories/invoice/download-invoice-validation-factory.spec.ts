import { makeDownloadInvoiceValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('DownloadInvoiceValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDownloadInvoiceValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('invoiceNo'))
    validations.push(new NumberValidation('invoiceNo'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
