import { makeDeleteChildrenValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteChildrenValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteChildrenValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new IdValidation('id', new IdValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
