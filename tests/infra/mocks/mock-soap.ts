import { SoapParser } from '@/data/protocols'

export class SoapParserSpy implements SoapParser {
  data: any
  result = { any: 'data' }

  async parse (data: any): Promise<any> {
    this.data = data
    return this.result
  }
}
