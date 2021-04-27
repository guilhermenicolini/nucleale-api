import { MoneyManipulator } from '@/data/protocols'

export class MoneyAdapter implements MoneyManipulator {
  constructor (
    private readonly decimals: number,
    private readonly separator: string
  ) { }

  format (value: number): string {
    return value.toFixed(this.decimals).replace('.', this.separator)
  }
}
