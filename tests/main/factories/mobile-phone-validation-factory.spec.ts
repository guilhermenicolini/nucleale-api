import { makeMobilePhoneValidation } from '@/main/factories'
import {
  ValidationComposite,
  BrazilPhoneValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('MobilePhoneValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeMobilePhoneValidation()
    const validations: Validation[] = []
    validations.push(new BrazilPhoneValidation('mobilePhone'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
