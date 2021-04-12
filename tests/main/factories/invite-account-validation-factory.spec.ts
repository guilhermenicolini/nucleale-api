import { makeInviteAccountValidation } from '@/main/factories'
import {
  ValidationComposite,
  IdValidation,
  EmailValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter, EmailValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('makeInviteAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeInviteAccountValidation()
    const validations: Validation[] = []
    validations.push(new IdValidation('accountId', new IdValidatorAdapter()))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
