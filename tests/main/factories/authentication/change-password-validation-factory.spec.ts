import { makeChangePasswordValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  PasswordValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('ChangePasswordValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeChangePasswordValidation()
    const validations: Validation[] = []
    for (const field of ['token', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new PasswordValidation('password'))
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
