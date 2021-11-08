import { BrazilMobilePhoneValidatorAdapter, EmailValidatorAdapter, IdValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { CompareFieldsValidation, EmailValidation, EnumValidation, FileValidation, IdValidation, MobilePhoneValidationComposite, NumberValidation, PasswordValidation, RequiredFieldValidation, TaxIdValidation } from '.'

export class ValidationBuilder {
  private constructor (
    private readonly field: string,
    private readonly validations: Validation[]
  ) {}

  static field (field: string): ValidationBuilder {
    return new ValidationBuilder(field, [])
  }

  compareTo (fieldtoCompare: string) {
    this.validations.push(new CompareFieldsValidation(this.field, fieldtoCompare))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.field, new EmailValidatorAdapter()))
    return this
  }

  enum (enumerator: any): ValidationBuilder {
    this.validations.push(new EnumValidation(this.field, enumerator))
    return this
  }

  file (length: number, mimeType: string): ValidationBuilder {
    this.validations.push(new FileValidation(this.field, length, mimeType))
    return this
  }

  id (): ValidationBuilder {
    this.validations.push(new IdValidation(this.field, new IdValidatorAdapter()))
    return this
  }

  mobile (): ValidationBuilder {
    const validators = [new BrazilMobilePhoneValidatorAdapter()]
    this.validations.push(new MobilePhoneValidationComposite(this.field, validators))
    return this
  }

  number (): ValidationBuilder {
    this.validations.push(new NumberValidation(this.field))
    return this
  }

  password (): ValidationBuilder {
    this.validations.push(new PasswordValidation(this.field))
    return this
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.field))
    return this
  }

  taxId (): ValidationBuilder {
    this.validations.push(new TaxIdValidation(this.field))
    return this
  }

  build (): Validation[] {
    return this.validations
  }
}
