import { TimeManipulator } from '@/data/protocols'

import moment from 'moment-timezone'

export class MomentAdapter implements TimeManipulator {
  constructor (
    private readonly dateAndTimeFormat: string,
    private readonly dayFormat: string,
    private readonly dateFormat: string
  ) { }

  toDateAndTime (millis: number): string {
    return moment(millis).format(this.dateAndTimeFormat)
  }

  toDay (millis: number): string {
    return moment(millis).format(this.dayFormat)
  }

  toDate (millis: number): string {
    return moment(millis).format(this.dateFormat)
  }
}
