import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class PasswordValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    return new InvalidParamError(this.fieldName)
  }
}
