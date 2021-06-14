import { makeCreateInvoiceValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('CreateInvoiceValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateInvoiceValidation()
    const validations: Validation[] = []
    for (const field of ['user', 'procedure', 'amount']) {
      validations.push(new RequiredFieldValidation(field))
    }
    const idValidatioAdapter = new IdValidatorAdapter()
    for (const field of ['user', 'procedure']) {
      validations.push(new IdValidation(field, idValidatioAdapter))
    }
    validations.push(new NumberValidation('amount'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
