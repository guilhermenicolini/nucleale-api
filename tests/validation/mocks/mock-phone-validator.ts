import { PhoneValidator } from '@/validation/protocols'

export class PhoneValidatorSpy implements PhoneValidator {
  error = null as Error
  phone: string

  validate (phone: string): Error {
    this.phone = phone
    return this.error
  }
}
