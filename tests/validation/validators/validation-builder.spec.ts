import { BrazilMobilePhoneValidatorAdapter, EmailValidatorAdapter, IdValidatorAdapter } from '@/infra/validators'
import {
  ValidationBuilder as sut,
  CompareFieldsValidation,
  EmailValidation,
  EnumValidation,
  FileValidation,
  IdValidation,
  MobilePhoneValidationComposite,
  NumberValidation,
  PasswordValidation,
  RequiredFieldValidation,
  TaxIdValidation,
  ZipValidation
} from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('Should return CompareFieldsValidation', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_field'
    const validations = sut.field(field).compareTo(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  test('Should return EmailValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field, new EmailValidatorAdapter())])
  })

  test('Should return EnumValidation', () => {
    const field = 'any_field'
    const enumerator = { key: 'value' }
    const validations = sut.field(field).enum(enumerator).build()
    expect(validations).toEqual([new EnumValidation(field, enumerator)])
  })

  test('Should return FileValidation', () => {
    const field = 'any_field'
    const length = 3
    const mimeType = 'any_mime'
    const validations = sut.field(field).file(length, mimeType).build()
    expect(validations).toEqual([new FileValidation(field, length, mimeType)])
  })

  test('Should return IdValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).id().build()
    expect(validations).toEqual([new IdValidation(field, new IdValidatorAdapter())])
  })

  test('Should return MobilePhoneValidationComposite', () => {
    const field = 'any_field'
    const validations = sut.field(field).mobile().build()
    expect(validations).toEqual([new MobilePhoneValidationComposite(field, [new BrazilMobilePhoneValidatorAdapter()])])
  })

  test('Should return NumberValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).number().build()
    expect(validations).toEqual([new NumberValidation(field)])
  })

  test('Should return PasswordValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).password().build()
    expect(validations).toEqual([new PasswordValidation(field)])
  })

  test('Should return RequiredFieldValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return TaxIdValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).taxId().build()
    expect(validations).toEqual([new TaxIdValidation(field)])
  })

  test('Should return ZipValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).zip().build()
    expect(validations).toEqual([new ZipValidation(field)])
  })

  test('Should return a list of validations', () => {
    const field = 'any_field'
    const validations = sut.field(field).required().password().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new PasswordValidation(field)
    ])
  })
})
