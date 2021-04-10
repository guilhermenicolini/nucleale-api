import { IdValidator } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class IdValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly idValidator: IdValidator
  ) { }

  validate (input: any): Error {
    const isValid = this.idValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
