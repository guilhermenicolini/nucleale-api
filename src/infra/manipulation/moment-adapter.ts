import { TimeManipulator } from '@/data/protocols'

import moment from 'moment-timezone'

export class MomentAdapter implements TimeManipulator {
  private readonly firstPart: string
  private readonly secondPart: string
  private readonly thirdPart: string
  private readonly separator: string

  constructor (
    dmy: 'dmy' | 'mdy' = 'dmy',
    separator: string = '/'
  ) {
    this.firstPart = dmy === 'dmy' ? 'DD' : 'MM'
    this.secondPart = dmy === 'dmy' ? 'MM' : 'DD'
    this.thirdPart = 'YYYY'
    this.separator = separator
  }

  toDateAndTime (millis: number): string {
    return moment(millis).format(`${this.firstPart}${this.separator}${this.secondPart}${this.separator}${this.thirdPart} HH:mm`)
  }

  toDay (millis: number): string {
    return moment(millis).format('DD')
  }

  toDate (millis: number): string {
    return moment(millis).format(`${this.firstPart}${this.separator}${this.secondPart}${this.separator}${this.thirdPart}`)
  }

  toMonthAndYear (millis: number): string {
    return moment(millis).format(`${this.separator}MM${this.separator}YYYY`)
  }

  fromDate (value: string): number {
    return moment(value, `${this.firstPart}${this.separator}${this.secondPart}${this.separator}${this.thirdPart}`).valueOf()
  }

  fromDateAndTime (value: string): number {
    return moment(value, `${this.firstPart}${this.separator}${this.secondPart}${this.separator}${this.thirdPart} HH:mm:ss`).valueOf()
  }
}