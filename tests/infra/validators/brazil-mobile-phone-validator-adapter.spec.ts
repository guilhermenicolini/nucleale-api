import { BrazilMobilePhoneValidatorAdapter } from '@/infra/validators'

const makeSut = (): BrazilMobilePhoneValidatorAdapter => {
  return new BrazilMobilePhoneValidatorAdapter()
}

describe('BrazilMobilePhoneValidatorAdapter', () => {
  test('Should return true if no phone is provided', () => {
    const sut = makeSut()
    const isValid = sut.isValid(null)
    expect(isValid).toBe(true)
  })

  test('Should return true if empty phone is provided', () => {
    const sut = makeSut()
    const isValid = sut.isValid('')
    expect(isValid).toBe(true)
  })

  test('Should return true if empty phone is not from Brazil', () => {
    const sut = makeSut()
    const isValid = sut.isValid('+198765432')
    expect(isValid).toBe(true)
  })

  test('Should return false if phone do not has 14 characters', () => {
    const sut = makeSut()
    const isValid = sut.isValid('+5598765432')
    expect(isValid).toBe(false)
  })

  test('Should return false if phone do not has a valid area', () => {
    const sut = makeSut()
    const isValid = sut.isValid('+5500998765432')
    expect(isValid).toBe(false)
  })

  test('Should return false if phone do not have 9th digit', () => {
    const sut = makeSut()
    const isValid = sut.isValid('+5511098765432')
    expect(isValid).toBe(false)
  })

  test('Should return true if a valid phone is provided', () => {
    const sut = makeSut()
    const isValid = sut.isValid('+5519998765432')
    expect(isValid).toBe(true)
  })
})
