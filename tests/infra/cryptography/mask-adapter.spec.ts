import { MaskAdapter } from '@/infra/cryptography'
import StringMask from 'string-mask'
import faker from 'faker'

const applyStub = jest.fn().mockImplementation(() => 'masked')

jest.mock('string-mask', () => jest.fn().mockImplementation(() => {
  return {
    apply: applyStub
  }
}))

const mask = faker.random.word()

const makeSut = (): MaskAdapter => {
  return new MaskAdapter(mask)
}

describe('Mask Adapter', () => {
  describe('apply()', () => {
    test('Should call StringMask with correct values', async () => {
      const sut = makeSut()
      const masked = await sut.convert('any_data')
      expect(StringMask).toHaveBeenCalledWith(mask)
      expect(applyStub).toHaveBeenCalledWith('any_data')
      expect(masked).toBe('masked')
    })
  })
})
