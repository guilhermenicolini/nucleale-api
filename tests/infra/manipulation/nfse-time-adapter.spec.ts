import { NfseTimeAdapter } from '@/infra/manipulation'
import moment from 'moment-timezone'

const formatStub = jest.fn().mockReturnThis()
const toDateStub = jest.fn()

jest.mock('moment-timezone', () => jest.fn().mockImplementation(() => {
  return {
    format: formatStub,
    toDate: toDateStub
  }
}))

const millis = 1619481600000
const makeSut = (): NfseTimeAdapter => new NfseTimeAdapter()

describe('NfseTime Adapter', () => {
  describe('toDateAndTime()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toDateAndTime(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(formatStub).toHaveBeenCalledWith('YYYY-MM-DDTHH:mm:ss')
    })
  })

  describe('toDay()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toDay(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(formatStub).toHaveBeenCalledWith('DD')
    })
  })

  describe('toDate()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toDate(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(formatStub).toHaveBeenCalledWith('YYYY-MM-DD')
    })
  })

  describe('toIsoDate()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toIsoDate(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(formatStub).toHaveBeenCalledWith('YYYYMMDD')
    })
  })

  describe('toMonthAndYear()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toMonthAndYear(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(formatStub).toHaveBeenCalledWith('MM/YYYY')
    })
  })

  describe('toDateObj()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toDateObj(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(toDateStub).toHaveBeenCalled()
    })
  })

  describe('toIsoDate()', () => {
    test('Should call moment-timezone format with correct values', async () => {
      const sut = makeSut()
      sut.toIsoDate(millis)
      expect(moment).toHaveBeenCalledWith(millis)
      expect(formatStub).toHaveBeenCalledWith('YYYYMMDD')
    })
  })

  describe('fromDate()', () => {
    test('Should call moment-timezone with correct values', async () => {
      const sut = makeSut()
      sut.fromDate('2021-05-06')
      expect(moment).toHaveBeenCalledWith('2021-05-06', 'YYYY-MM-DD')
    })
  })

  describe('fromDateAndTime()', () => {
    test('Should call moment-timezone with correct values', async () => {
      const sut = makeSut()
      sut.fromDateAndTime('2021-05-06T14:15:16')
      expect(moment).toHaveBeenCalledWith('2021-05-06T14:15:16', 'YYYY-MM-DDTHH:mm:ss')
    })
  })
})
