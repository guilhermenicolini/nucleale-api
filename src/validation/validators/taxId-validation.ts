import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { isValidCpf } from '@/validation/utils'

export class TaxIdValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) { }

  validate (input: any): Error {
    if (!isValidCpf(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
