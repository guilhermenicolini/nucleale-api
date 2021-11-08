import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class NumberValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (typeof input[this.fieldName] !== 'number' || !/^[0-9]+$/.test(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
