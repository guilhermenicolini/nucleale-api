import { MobilePhoneValidator } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class MobilePhoneValidationComposite implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly validations: MobilePhoneValidator[]
  ) { }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const isValid = validation.isValid(input[this.fieldName])
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
