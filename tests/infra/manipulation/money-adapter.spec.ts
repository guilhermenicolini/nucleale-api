import { MoneyAdapter } from '@/infra/manipulation'

const decimals = 2
const separator = ','

const makeSut = (): MoneyAdapter => new MoneyAdapter(
  decimals,
  separator
)

describe('Money Adapter', () => {
  describe('format()', () => {
    test('Should format without decimals', async () => {
      const sut = makeSut()
      const result = sut.format(1)
      expect(result).toBe('1,00')
    })

    test('Should format with less decimals', async () => {
      const sut = makeSut()
      const result = sut.format(1.9)
      expect(result).toBe('1,90')
    })

    test('Should format with equal decimals', async () => {
      const sut = makeSut()
      const result = sut.format(1.99)
      expect(result).toBe('1,99')
    })

    test('Should format and round with more decimals', async () => {
      const sut = makeSut()
      const result = sut.format(1.235)
      expect(result).toBe('1,24')
    })
  })
})
