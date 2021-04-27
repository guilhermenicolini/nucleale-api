export interface TimeManipulator {
  toDateAndTime: (millis: number) => string
  toDay: (millis: number) => string
  toDate: (millis: number) => string
}
