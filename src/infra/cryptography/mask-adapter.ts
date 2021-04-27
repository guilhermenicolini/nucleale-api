import { Converter } from '@/data/protocols'

import StringMask from 'string-mask'

export class MaskAdapter implements Converter {
  constructor (private readonly mask: string) { }

  async convert (data: string): Promise<string> {
    return new StringMask(this.mask).apply(data)
  }
}
