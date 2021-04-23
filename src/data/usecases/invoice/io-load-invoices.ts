import { LoadInvoicesFromBuffer } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols'

export class IoLoadInvoices implements LoadInvoicesFromBuffer {
  constructor (
    private readonly decrypter: Decrypter
  ) { }

  async load (buffer: Buffer): Promise<LoadInvoicesFromBuffer.Result> {
    const obj = await this.decrypter.decrypt(buffer.toString('latin1'))
    return obj
  }
}
