import { LoadInvoicesFromBuffer } from '@/domain/usecases'
import { Decrypter, Transformer } from '@/data/protocols'
import { nfseModel, InvoiceModel } from '@/domain/models'

export class IoLoadInvoices implements LoadInvoicesFromBuffer {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly transformer: Transformer<Omit<InvoiceModel, 'id'>>
  ) { }

  async load (buffer: Buffer): Promise<LoadInvoicesFromBuffer.Result> {
    const data = await this.decrypter.decrypt(buffer) as nfseModel

    const nfses = []
    for (const nf of data.NOTAS_FISCAIS.NOTA_FISCAL) {
      const nfse = this.transformer.transform(nf)
      nfses.push(nfse)
    }
    return nfses
  }
}
