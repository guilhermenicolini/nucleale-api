import { makeLoadAddressByZipValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  ZipValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('CreateInvoiceValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadAddressByZipValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('zip'))
    validations.push(new ZipValidation('zip'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
