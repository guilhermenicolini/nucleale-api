import { MomentAdapter } from '@/infra/manipulation'
import moment from 'moment-timezone'

const formatStub = jest.fn().mockImplementation(() => '2020-04-27 00:00')

jest.mock('moment-timezone', () => jest.fn().mockImplementation(() => {
  return {
    format: formatStub
  }
}))

const makeSut = (): MomentAdapter => new MomentAdapter()

describe('Moment Adapter', () => {
  describe('format()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.format(1619481600000, 'YYYY-MM-DD HH:mm')
      expect(moment).toHaveBeenCalledWith(1619481600000)
      expect(formatStub).toHaveBeenCalledWith('YYYY-MM-DD HH:mm')
    })

    test('Should format on success', async () => {
      const sut = makeSut()
      const time = sut.format(1619481600000, 'YYYY-MM-DD HH:mm')
      expect(time).toBe('2020-04-27 00:00')
    })
  })
})
