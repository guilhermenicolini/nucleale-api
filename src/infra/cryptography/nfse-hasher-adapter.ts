import { Hasher } from '@/data/protocols'
import { InvoiceModel } from '@/domain/models'

import Crypto from 'crypto'

export class NfseHasherAdapter implements Hasher<InvoiceModel, string> {
  async hash (plain: InvoiceModel): Promise<string> {
    const signature = []
    signature.push(plain.provider.registryId.padStart(11, '0'))
    signature.push(plain.rpsSerie.padEnd(5, ' '))
    signature.push(plain.rpsNumber.toString().padStart(12, '0'))
    signature.push(plain.invoiceDate)
    signature.push(plain.taxation.padEnd(2, ' '))
    signature.push(plain.status)
    signature.push(plain.pickupType === 'A' ? 'N' : 'S')
    signature.push(plain.invoiceValue.toFixed(2).replace('.', '').padStart(15, '0'))
    signature.push('0'.padStart(15, '0'))
    signature.push(plain.cnae.padStart(10, '0'))
    signature.push(plain.taker.taxId.padStart(14, '0'))
    return Crypto.createHash('sha1').update(signature.join('')).digest('hex')
  }
}
