import { MaskManipulator } from '@/data/protocols'

import StringMask from 'string-mask'

export class StringMaskAdapter implements MaskManipulator {
  mask (value: any, format: string): string {
    return new StringMask(format).apply(value.replace(/[^0-9]/g, ''))
  }
}
