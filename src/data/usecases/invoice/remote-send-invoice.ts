import { SendInvoice } from '@/domain/usecases'
import { ObjectConverter, Encoder, Signer, SoapClient, Decoder, SoapRequest } from '@/data/protocols'
import env from '@/main/config/env'
import { RpsLoteResultModel } from '@/domain/models'
import { SoapError } from '@/presentation/errors'

export class RemoteSendInvoice implements SendInvoice {
  constructor (
    private readonly invoiceToRpsConverter: ObjectConverter<SendInvoice.Params, SendInvoice.Rps>,
    private readonly encoder: Encoder,
    private readonly signer: Signer,
    private readonly soapClient: SoapClient,
    private readonly decoder: Decoder<RpsLoteResultModel>
  ) { }

  async send (params: SendInvoice.Params): Promise<SendInvoice.Result> {
    try {
      const rps = await this.invoiceToRpsConverter.convert(params)
      const xml = await this.encoder.encode(rps)
      const xmlSigned = await this.signer.sign(xml)

      const soapRequest: SoapRequest = {
        url: env.nfse.url,
        method: env.nfse.methods.lote.request,
        responseMethod: env.nfse.methods.lote.response,
        message: {
          mensagemXml: xmlSigned
        }
      }

      const soapResponse = await this.soapClient.send(soapRequest)
      if (!soapResponse.success) {
        return soapResponse.error
      }
      const response = await this.decoder.decode(soapResponse.response)
      if (response['ns1:RetornoEnvioLoteRPS'].Erros?.Erro) {
        return new SoapError(`${response['ns1:RetornoEnvioLoteRPS'].Erros.Erro.Codigo} ${response['ns1:RetornoEnvioLoteRPS'].Erros.Erro.Descricao}`)
      }
      return {
        invoiceNo: parseInt(response['ns1:RetornoEnvioLoteRPS'].ChavesNFSeRPS.ChaveNFSeRPS.ChaveNFe.NumeroNFe),
        verificationCode: response['ns1:RetornoEnvioLoteRPS'].ChavesNFSeRPS.ChaveNFSeRPS.ChaveNFe.CodigoVerificacao
      }
    } catch (error) {
      return error
    }
  }
}
