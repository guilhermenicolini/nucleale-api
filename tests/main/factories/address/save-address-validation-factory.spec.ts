import { makeSaveAddressValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation,
  NumberValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('ApproveAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveAddressValidation()
    const validations: Validation[] = []
    for (const field of ['address', 'number', 'district', 'city', 'cityId', 'state', 'zip', 'country']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new NumberValidation('cityId'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
