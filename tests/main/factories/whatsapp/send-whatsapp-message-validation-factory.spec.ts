import { makeSendWhatsappMessageValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('SendWhatsappMessageValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSendWhatsappMessageValidation()
    const validations: Validation[] = []
    for (const field of ['mobilePhone', 'message']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
