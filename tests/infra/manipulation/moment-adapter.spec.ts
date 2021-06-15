import { MomentAdapter } from '@/infra/manipulation'
import moment from 'moment-timezone'

const formatStub = jest.fn().mockReturnThis()

jest.mock('moment-timezone', () => jest.fn().mockImplementation(() => {
  return {
    format: formatStub
  }
}))

const millis = 1619481600000
const valueBR = '27/04/2020 00:00'
const valueEN = '04-27-2020 00:00'
const makeSutDMY = (): MomentAdapter => new MomentAdapter()
const makeSutMDY = (): MomentAdapter => new MomentAdapter('mdy', '-')

describe('Moment Adapter', () => {
  describe('DMY', () => {
    describe('toDateAndTime()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutDMY()
        sut.toDateAndTime(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('DD/MM/YYYY HH:mm')
      })
    })

    describe('toDay()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutDMY()
        sut.toDay(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('DD')
      })
    })

    describe('toDate()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutDMY()
        sut.toDate(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('DD/MM/YYYY')
      })
    })

    describe('toIsoDate()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutDMY()
        sut.toIsoDate(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('YYYYMMDD')
      })
    })

    describe('toMonthAndYear()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutDMY()
        sut.toMonthAndYear(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('/MM/YYYY')
      })
    })

    describe('fromDate()', () => {
      test('Should call moment-timezone with correct values', async () => {
        const sut = makeSutDMY()
        sut.fromDate(valueBR)
        expect(moment).toHaveBeenCalledWith(valueBR, 'DD/MM/YYYY')
      })
    })

    describe('fromDateAndTime()', () => {
      test('Should call moment-timezone with correct values', async () => {
        const sut = makeSutDMY()
        sut.fromDateAndTime(valueBR)
        expect(moment).toHaveBeenCalledWith(valueBR, 'DD/MM/YYYY HH:mm:ss')
      })
    })
  })

  describe('MDY', () => {
    describe('toDateAndTime()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutMDY()
        sut.toDateAndTime(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('MM-DD-YYYY HH:mm')
      })
    })

    describe('toDay()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutMDY()
        sut.toDay(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('DD')
      })
    })

    describe('toDate()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutMDY()
        sut.toDate(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('MM-DD-YYYY')
      })
    })

    describe('toIsoDate()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutMDY()
        sut.toIsoDate(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('YYYYMMDD')
      })
    })

    describe('toMonthAndYear()', () => {
      test('Should call moment-timezone format with correct values', async () => {
        const sut = makeSutMDY()
        sut.toMonthAndYear(millis)
        expect(moment).toHaveBeenCalledWith(millis)
        expect(formatStub).toHaveBeenCalledWith('-MM-YYYY')
      })
    })

    describe('fromDate()', () => {
      test('Should call moment-timezone with correct values', async () => {
        const sut = makeSutMDY()
        sut.fromDate(valueEN)
        expect(moment).toHaveBeenCalledWith(valueEN, 'MM-DD-YYYY')
      })
    })

    describe('fromDateAndTime()', () => {
      test('Should call moment-timezone with correct values', async () => {
        const sut = makeSutMDY()
        sut.fromDateAndTime(valueEN)
        expect(moment).toHaveBeenCalledWith(valueEN, 'MM-DD-YYYY HH:mm:ss')
      })
    })
  })
})
