import { SoapParser } from '@/data/protocols'
import faker from 'faker'

export class SoapParserSpy implements SoapParser {
  data: any
  result = faker.random.objectElement()

  async parse (data: any): Promise<any> {
    this.data = data
    return this.result
  }
}
