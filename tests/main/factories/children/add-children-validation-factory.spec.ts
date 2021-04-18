import { makeAddChildrenValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddChildrenValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddChildrenValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'birth', 'gender']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new NumberValidation('birth'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
