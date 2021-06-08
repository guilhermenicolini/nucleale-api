import { TimeManipulator, MoneyManipulator, MaskManipulator, StringManipulator } from '@/data/protocols'

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

export class MoneyManipulatorSpy implements MoneyManipulator {
  value: number
  result = 'any_value'

  format (value: number): string {
    this.value = value
    return this.result
  }
}

export class MaskManipulatorSpy implements MaskManipulator {
  value: any
  format: string
  result = 'any_masked'

  mask (value: any, format: string): string {
    this.value = value
    this.format = format
    return this.result
  }
}

export class StringManipulatorSpy implements StringManipulator {
  value: any
  args: any | any[]
  resultStr = 'any_string'

  format (value: string, args: any | any[]): string {
    this.value = value
    this.args = args
    return this.resultStr
  }

  normalize (value: string): string {
    this.value = value
    return this.resultStr
  }
}
