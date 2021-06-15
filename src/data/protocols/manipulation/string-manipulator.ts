export interface StringManipulator {
  format: (value: string, args: any | any[]) => string
  normalize: (value: string) => string
}
