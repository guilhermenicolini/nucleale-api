export interface TimeManipulator {
  toDateAndTime: (millis: number) => string
  toDay: (millis: number) => string
  toDate: (millis: number) => string
  toMonthAndYear: (millis: number) => string
  fromDate: (value: string) => number
  fromDateAndTime: (value: string) => number
}
