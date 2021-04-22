import { Converter } from '@/data/protocols'

import builder from 'xmlbuilder2'

export class XmlConverterAdapter implements Converter {
  constructor (
    private readonly encoding: string
  ) { }

  async convert (xml: any): Promise<any> {
    return builder
      .create(xml, { encoding: this.encoding })
      .end({ prettyPrint: true })
  }
}
