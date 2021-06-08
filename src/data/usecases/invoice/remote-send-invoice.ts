import { SendInvoice } from '@/domain/usecases'
import { ObjectConverter } from '@/data/protocols/convertion'

export class RemoteSendInvoice implements SendInvoice {
  constructor (
    private readonly invoiceToRpsConverter: ObjectConverter<SendInvoice.Params, SendInvoice.Rps>
  ) { }

  async send (params: SendInvoice.Params): Promise<SendInvoice.Result> {
    try {
      await this.invoiceToRpsConverter.convert(params)
      return null
    } catch (error) {
      return error
    }
  }
}
