import { MaskAdapter } from '@/infra/cryptography'
import StringMask from 'string-mask'
import faker from 'faker'

jest.mock('string-mask')

const mask = faker.random.word()

const makeSut = (): MaskAdapter => {
  return new MaskAdapter(mask)
}

describe('Mask Adapter', () => {
  describe('apply()', () => {
    test('Should call StringMask with correct values', async () => {
      const sut = makeSut()
      await sut.convert('any_data')
      expect(StringMask).toHaveBeenCalledWith(mask)
    })
  })
})
