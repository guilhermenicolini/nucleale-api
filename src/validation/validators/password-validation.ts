import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class PasswordValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    const value = input[this.fieldName]
    if (value.length < 8 ||
      !/[a-z]/.test(value) ||
      !/[A-Z]/.test(value) ||
      !/[0-9]/.test(value)) return new InvalidParamError(this.fieldName)
  }
}
