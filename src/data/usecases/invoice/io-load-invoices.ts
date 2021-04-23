import { LoadInvoicesFromBuffer } from '@/domain/usecases'
import { Decrypter, Transformer } from '@/data/protocols'

export class IoLoadInvoices implements LoadInvoicesFromBuffer {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly transformer: Transformer<LoadInvoicesFromBuffer.Result>
  ) { }

  async load (buffer: Buffer): Promise<LoadInvoicesFromBuffer.Result> {
    const data = await this.decrypter.decrypt(buffer)
    return this.transformer.transform(data)
  }
}
