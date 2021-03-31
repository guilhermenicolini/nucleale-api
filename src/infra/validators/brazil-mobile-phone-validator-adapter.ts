import { MobilePhoneValidator } from '@/validation/protocols'
import { brazilAreas } from '@/validation/utils'

export class BrazilMobilePhoneValidatorAdapter implements MobilePhoneValidator {
  isValid (mobilePhone: string): boolean {
    if (!mobilePhone || !mobilePhone.startsWith('+55')) {
      return true
    }

    if (mobilePhone.length !== 14) {
      return false
    }

    const area = mobilePhone.substring(3, 5)
    const areas = [].concat(...(Object.values(brazilAreas)))

    if (!areas.includes(area)) {
      return false
    }

    const number = mobilePhone.substring(5)
    if (!number.startsWith('9')) {
      return false
    }

    return true
  }
}
