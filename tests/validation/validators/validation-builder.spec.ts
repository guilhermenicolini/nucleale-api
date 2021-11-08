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
  TaxIdValidation
} from '@/validation/validators'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.collation()
    const validations = sut.field(field).compareTo(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field, new EmailValidatorAdapter())])
  })

  test('Should return EnumValidation', () => {
    const field = faker.database.column()
    const enumerator = faker.random.objectElement()
    const validations = sut.field(field).enum(enumerator).build()
    expect(validations).toEqual([new EnumValidation(field, enumerator)])
  })

  test('Should return FileValidation', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const mimeType = faker.system.mimeType()
    const validations = sut.field(field).file(length, mimeType).build()
    expect(validations).toEqual([new FileValidation(field, length, mimeType)])
  })

  test('Should return IdValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).id().build()
    expect(validations).toEqual([new IdValidation(field, new IdValidatorAdapter())])
  })

  test('Should return MobilePhoneValidationComposite', () => {
    const field = faker.database.column()
    const validations = sut.field(field).mobile().build()
    expect(validations).toEqual([new MobilePhoneValidationComposite(field, [new BrazilMobilePhoneValidatorAdapter()])])
  })

  test('Should return NumberValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).number().build()
    expect(validations).toEqual([new NumberValidation(field)])
  })

  test('Should return PasswordValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).password().build()
    expect(validations).toEqual([new PasswordValidation(field)])
  })

  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return TaxIdValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).taxId().build()
    expect(validations).toEqual([new TaxIdValidation(field)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().password().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new PasswordValidation(field)
    ])
  })
})
