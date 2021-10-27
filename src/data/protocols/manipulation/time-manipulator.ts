export interface TimeManipulator {
  toDateAndTime: (millis: number) => string
  toDay: (millis: number) => string
  toDate: (millis: number) => string
  toIsoDate: (millis: number) => string
  toMonthAndYear: (millis: number) => string
  toDateObj: (millis: number) => Date
  fromDate: (value: string) => number
  fromDateAndTime: (value: string) => number
}
