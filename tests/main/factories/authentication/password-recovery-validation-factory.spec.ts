import { makePasswordRevoceryValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('PasswordRevoceryValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makePasswordRevoceryValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('email'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
