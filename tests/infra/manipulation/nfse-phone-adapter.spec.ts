import { NfsePhoneManipulator } from '@/infra/manipulation'

const makeSut = (): NfsePhoneManipulator => new NfsePhoneManipulator()

describe('NfsePhone Adapter', () => {
  describe('isValid()', () => {
    test('Should return null if phone is null', async () => {
      const sut = makeSut()
      const result = sut.getArea(null)
      expect(result).toBe(null)
    })

    test('Should return null if phone length is not 14', async () => {
      const sut = makeSut()
      const result = sut.getArea('any_number')
      expect(result).toBe(null)
    })

    test('Should return null if phone do not start with +55', async () => {
      const sut = makeSut()
      const result = sut.getArea('+CC19998765432')
      expect(result).toBe(null)
    })
  })

  describe('getArea()', () => {
    test('Should return correct area', () => {
      const sut = makeSut()
      const area = sut.getArea('+5519998765432')
      expect(area).toBe('19')
    })

    test('Should return null on invalid phone', () => {
      const sut = makeSut()
      const area = sut.getArea('wrong_phone')
      expect(area).toBe(null)
    })
  })

  describe('getNumber()', () => {
    test('Should return correct number', () => {
      const sut = makeSut()
      const number = sut.getNumber('+5519998765432')
      expect(number).toBe('998765432')
    })

    test('Should return null on invalid phone', () => {
      const sut = makeSut()
      const number = sut.getNumber('wrong_phone')
      expect(number).toBe(null)
    })
  })
})
