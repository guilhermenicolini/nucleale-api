import { makeLoadAccountsByStatusValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EnumValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { AccountStatus } from '@/domain/models'

jest.mock('@/validation/validators/validation-composite')

describe('makeLoadAccountsByStatusValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadAccountsByStatusValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('status'))
    validations.push(new EnumValidation('status', AccountStatus))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
