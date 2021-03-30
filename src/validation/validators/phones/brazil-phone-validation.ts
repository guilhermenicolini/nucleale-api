import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { brazilAreas } from '@/validation/utils'

export class BrazilPhoneValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    const mobilePhone = input[this.fieldName] as string
    if (!mobilePhone || !mobilePhone.startsWith('+55')) {
      return null
    }

    if (mobilePhone.length !== 14) {
      return new InvalidParamError(this.fieldName)
    }

    const area = input[this.fieldName].substring(3, 5)
    const areas = [].concat(...(Object.values(brazilAreas)))

    if (!areas.includes(area)) {
      return new InvalidParamError(this.fieldName)
    }

    const number = input[this.fieldName].substring(5)
    if (!number.startsWith('9')) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
