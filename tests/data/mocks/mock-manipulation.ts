import { TimeManipulator } from '@/data/protocols'

export class TimeManipulatorSpy implements TimeManipulator {
  millis: number
  value: string
  resultStr = 'any_date'
  resultInt = 100

  toDateAndTime (millis: number): string {
    this.millis = millis
    return this.resultStr
  }

  toDay (millis: number): string {
    this.millis = millis
    return this.resultStr
  }

  toDate (millis: number): string {
    this.millis = millis
    return this.resultStr
  }

  toMonthAndYear (millis: number): string {
    this.millis = millis
    return this.resultStr
  }

  fromDate (value: string): number {
    this.value = value
    return this.resultInt
  }

  fromDateAndTime (value: string): number {
    this.value = value
    return this.resultInt
  }
}
