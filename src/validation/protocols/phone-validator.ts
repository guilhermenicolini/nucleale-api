export interface PhoneValidator {
  validate: (phone: string) => Error
}
