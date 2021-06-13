import { SendInvoice } from '@/domain/usecases'
import { ObjectConverter, Encoder, Signer, SoapClient, Decoder } from '@/data/protocols'
import env from '@/main/config/env'

export class RemoteSendInvoice implements SendInvoice {
  constructor (
    private readonly invoiceToRpsConverter: ObjectConverter<SendInvoice.Params, SendInvoice.Rps>,
    private readonly encoder: Encoder,
    private readonly signer: Signer,
    private readonly soapClient: SoapClient,
    private readonly decoder: Decoder
  ) { }

  async send (params: SendInvoice.Params): Promise<SendInvoice.Result> {
    try {
      const rps = await this.invoiceToRpsConverter.convert(params)
      const xml = await this.encoder.encode(rps)
      const xmlSigned = await this.signer.sign(xml)

      const response = await this.soapClient.send({
        url: env.nfse.url,
        method: env.nfse.methods.lote,
        message: {
          mensagemXml: xmlSigned
        }
      })
      if (!response.success) {
        return response.error
      }
      await this.decoder.decode(response.response)
      return null
    } catch (error) {
      return error
    }
  }
}
