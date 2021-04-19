import { makeUpdateChildrenValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  IdValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { IdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('UpdateChildrenValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateChildrenValidation()
    const validations: Validation[] = []
    for (const field of ['id', 'name', 'birth', 'gender']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new IdValidation('id', new IdValidatorAdapter()))
    validations.push(new NumberValidation('birth'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
