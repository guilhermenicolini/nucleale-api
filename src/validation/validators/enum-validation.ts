import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class EnumValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly enumerator: any
  ) { }

  validate (input: any): Error {
    const value = input[this.fieldName]
    const key = Object.keys(this.enumerator).find(key => this.enumerator[key] === value)

    if (!key) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
