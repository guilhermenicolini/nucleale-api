import { makeCheckPasswordRequestValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCheckPasswordRequestValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('token'))
    validations.push(new IdValidation('token', new IdValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
