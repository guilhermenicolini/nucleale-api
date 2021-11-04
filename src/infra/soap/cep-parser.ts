import { SoapParser } from '@/data/protocols'

export class CepParser implements SoapParser {
  async parse (data: any): Promise<any> {
    return data
  }
}
