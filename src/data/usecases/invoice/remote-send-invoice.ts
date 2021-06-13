import { SendInvoice } from '@/domain/usecases'
import { ObjectConverter, Encoder, Signer } from '@/data/protocols'

export class RemoteSendInvoice implements SendInvoice {
  constructor (
    private readonly invoiceToRpsConverter: ObjectConverter<SendInvoice.Params, SendInvoice.Rps>,
    private readonly encoder: Encoder,
    private readonly signer: Signer
  ) { }

  async send (params: SendInvoice.Params): Promise<SendInvoice.Result> {
    try {
      const rps = await this.invoiceToRpsConverter.convert(params)
      const xml = await this.encoder.encode(rps)
      await this.signer.sign(xml)
      return null
    } catch (error) {
      return error
    }
  }
}
