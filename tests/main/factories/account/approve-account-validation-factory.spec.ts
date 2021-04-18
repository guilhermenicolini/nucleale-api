import { makeApproveAccountValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('ApproveAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeApproveAccountValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validations.push(new IdValidation('id', new IdValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
