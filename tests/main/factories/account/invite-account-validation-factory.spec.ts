import { makeInviteAccountValidation } from '@/main/factories'
import {
  ValidationComposite,
  EmailValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('makeInviteAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeInviteAccountValidation()
    const validations: Validation[] = []
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
