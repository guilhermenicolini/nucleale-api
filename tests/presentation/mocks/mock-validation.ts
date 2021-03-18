import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  error = null as Error
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}
