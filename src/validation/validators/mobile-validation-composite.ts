import { PhoneValidator } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'

export class MobileValidationComposite implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly phoneValidators: PhoneValidator[]
  ) { }

  validate (input: any): Error {
    for (const validation of this.phoneValidators) {
      const error = validation.validate(input[this.fieldName])
      if (error) {
        return error
      }
    }
  }
}
