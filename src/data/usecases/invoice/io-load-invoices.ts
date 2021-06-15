import { LoadInvoicesFromBuffer } from '@/domain/usecases'
import { Decoder, Transformer } from '@/data/protocols'
import { nfseModel, InvoiceModel } from '@/domain/models'

export class IoLoadInvoices implements LoadInvoicesFromBuffer {
  constructor (
    private readonly decoder: Decoder,
    private readonly transformer: Transformer<Omit<InvoiceModel, 'id'>>
  ) { }

  async load (buffer: Buffer): Promise<LoadInvoicesFromBuffer.Result> {
    const data = await this.decoder.decode(buffer) as nfseModel

    const nfses = []
    for (const nf of data.NOTAS_FISCAIS.NOTA_FISCAL) {
      const nfse = this.transformer.transform(nf)
      nfses.push(nfse)
    }
    return nfses
  }
}
