import { TimeManipulator } from '@/data/protocols'

import moment from 'moment-timezone'

export class NfseTimeAdapter implements TimeManipulator {
  toDateAndTime (millis: number): string {
    return moment(millis).format('YYYY-MM-DDTHH:mm:ss')
  }

  toDay (millis: number): string {
    return moment(millis).format('DD')
  }

  toDate (millis: number): string {
    return moment(millis).format('YYYY-MM-DD')
  }

  toMonthAndYear (millis: number): string {
    return moment(millis).format('MM/YYYY')
  }

  toIsoDate (millis: number): string {
    return moment(millis).format('YYYYMMDD')
  }

  fromDate (value: string): number {
    return moment(value, 'YYYY-MM-DD').valueOf()
  }

  fromDateAndTime (value: string): number {
    return moment(value, 'YYYY-MM-DDTHH:mm:ss').valueOf()
  }
}
