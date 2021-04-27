import { MomentAdapter } from '@/infra/manipulation'
import moment from 'moment-timezone'

const formatStub = jest.fn().mockImplementation(() => '2020-04-27 00:00')

jest.mock('moment-timezone', () => jest.fn().mockImplementation(() => {
  return {
    format: formatStub
  }
}))

const millis = 1619481600000
const dateAndTimeFormat = 'DD/MM/YYYY HH:mm'
const dayFormat = 'DD'
const dateFormat = 'DD/MM/YYYY'

const makeSut = (): MomentAdapter => new MomentAdapter(
  dateAndTimeFormat,
  dayFormat,
  dateFormat
)

describe('Moment Adapter', () => {
  describe('toDateAndTime()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toDateAndTime(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(formatStub).toHaveBeenCalledWith(dateAndTimeFormat)
    })
  })

  describe('toDay()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toDay(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(formatStub).toHaveBeenCalledWith(dayFormat)
    })
  })
})
