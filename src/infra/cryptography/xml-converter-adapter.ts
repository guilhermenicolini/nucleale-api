import { Converter, Decrypter } from '@/data/protocols'

import builder from 'xmlbuilder2'

export class XmlConverterAdapter implements Converter, Decrypter {
  constructor (
    private readonly encoding: string
  ) { }

  async convert (obj: any): Promise<any> {
    return builder
      .create(obj, { encoding: this.encoding })
      .end({ prettyPrint: true })
  }

  async decrypt (xml: any): Promise<any> {
    return builder.convert(xml.toString(this.encoding), { format: 'object' })
  }
}
