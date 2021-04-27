export interface TimeManipulator {
  format: (millis: number, format: string) => string
}
