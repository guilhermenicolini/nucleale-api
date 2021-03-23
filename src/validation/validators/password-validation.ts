import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class PasswordValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    const value = input[this.fieldName]
    if (value.length < 8) return new InvalidParamError(this.fieldName)
  }
}
