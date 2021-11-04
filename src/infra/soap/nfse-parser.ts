import { SoapParser } from '@/data/protocols'
import { SoapError } from '@/presentation/errors'

export class NfseParser implements SoapParser {
  async parse (data: any): Promise<any> {
    const value = data?.$value || 'missing $value'
    if (!value.includes('?xml')) {
      throw new SoapError(value)
    }
    return value
  }
}
