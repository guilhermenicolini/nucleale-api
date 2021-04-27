import { StringMaskAdapter } from '@/infra/manipulation'
import StringMask from 'string-mask'

const applyStub = jest.fn().mockImplementation(() => '12345-678')

jest.mock('string-mask', () => jest.fn().mockImplementation(() => {
  return {
    apply: applyStub
  }
}))

const value = '12345678'
const mask = '00000-000'

const makeSut = (): StringMaskAdapter => new StringMaskAdapter()

describe('StringMask Adapter', () => {
  describe('mask()', () => {
    test('Should call string-mask apply with correct values', () => {
      const sut = makeSut()
      const masked = sut.mask(value, mask)
      expect(StringMask).toHaveBeenCalledWith(value)
      expect(applyStub).toHaveBeenCalledWith(mask)
      expect(masked).toBe('12345-678')
    })
  })
})
