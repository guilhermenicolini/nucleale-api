import { PhoneManipulator } from '@/data/protocols'

export class NfsePhoneAdapter implements PhoneManipulator {
  private isValid = (phone: string): boolean => {
    return [13, 14].includes(phone?.length) && phone?.startsWith('+55')
  }

  getArea (phone: string): string {
    if (this.isValid(phone)) {
      return phone.substring(3, 5)
    }
    return null
  }

  getNumber (phone: string): string {
    if (this.isValid(phone)) {
      return phone.substring(5)
    }
    return null
  }
}
