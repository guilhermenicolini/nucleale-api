import { MobilePhoneValidator } from '@/validation/protocols'

export class MobilePhoneValidatorSpy implements MobilePhoneValidator {
  isMobilePhoneValid = true
  phone: string

  isValid (phone: string): boolean {
    this.phone = phone
    return this.isMobilePhoneValid
  }
}
