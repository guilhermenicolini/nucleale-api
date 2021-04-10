import { IdValidator } from '@/validation/protocols'

export class IdValidatorSpy implements IdValidator {
  isIdValid = true
  id: string

  isValid (id: string): boolean {
    this.id = id
    return this.isIdValid
  }
}
