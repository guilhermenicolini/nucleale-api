import { Encoder, Decoder } from '@/data/protocols'

import { create, convert } from 'xmlbuilder2'

export class XmlConverterAdapter implements Encoder, Decoder {
  constructor (
    private readonly encoding: string
  ) { }

  async encode (data: any): Promise<any> {
    return create(data, { encoding: this.encoding })
      .end({ prettyPrint: true })
  }

  async decode (xml: any): Promise<any> {
    return convert(xml.toString(this.encoding), { format: 'object' })
  }
}
