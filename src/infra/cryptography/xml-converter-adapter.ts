import { ObjectConverter, Decrypter } from '@/data/protocols'

import builder, { convert as builderConvert } from 'xmlbuilder2'

export class XmlConverterAdapter implements ObjectConverter, Decrypter {
  constructor (
    private readonly encoding: string
  ) { }

  async convert (obj: any): Promise<any> {
    return builder
      .create(obj, { encoding: this.encoding })
      .end({ prettyPrint: true })
  }

  async decrypt (xml: any): Promise<any> {
    return builderConvert(xml.toString(this.encoding), { format: 'object' })
  }
}
