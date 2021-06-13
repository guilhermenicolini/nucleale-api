import { SendInvoice } from '@/domain/usecases'
import { ObjectConverter, Encoder } from '@/data/protocols'

export class RemoteSendInvoice implements SendInvoice {
  constructor (
    private readonly invoiceToRpsConverter: ObjectConverter<SendInvoice.Params, SendInvoice.Rps>,
    private readonly encoder: Encoder
  ) { }

  async send (params: SendInvoice.Params): Promise<SendInvoice.Result> {
    try {
      const rps = await this.invoiceToRpsConverter.convert(params)
      await this.encoder.encode(rps)
      return null
    } catch (error) {
      return error
    }
  }
}
