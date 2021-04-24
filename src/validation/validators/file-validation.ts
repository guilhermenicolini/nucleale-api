import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class FileValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly length: number,
    private readonly mimeType: string
  ) { }

  validate (input: any): Error {
    if (!Array.isArray(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }

    if (input[this.fieldName].length !== this.length) {
      return new InvalidParamError(this.fieldName)
    }

    for (const file of input[this.fieldName]) {
      const re = new RegExp(this.mimeType, 'g')
      if (!re.test(file.mimetype)) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
