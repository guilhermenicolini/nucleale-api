import { LoadAddressByZip } from '@/domain/usecases'
import { SoapClient, SoapRequest } from '@/data/protocols'
import env from '@/main/config/env'

export class RemoteLoadAddressByZip implements LoadAddressByZip {
  constructor (
    private readonly soapClient: SoapClient
  ) { }

  async load (zip: string): Promise<RemoteLoadAddressByZip.Result> {
    try {
      const soapRequest: SoapRequest = {
        url: env.correios.url,
        method: env.correios.methods.consultaCEP.request,
        responseMethod: env.correios.methods.consultaCEP.response,
        message: {
          cep: zip
        }
      }
      const soapResponse = await this.soapClient.send(soapRequest)
      if (!soapResponse.success) {
        return null
      }
      const { end, bairro, cidade, uf } = soapResponse.response
      return {
        address: end,
        district: bairro,
        city: cidade,
        state: uf
      }
    } catch (error) {
      return null
    }
  }
}

export namespace RemoteLoadAddressByZip {
  export type Result = LoadAddressByZip.Result
}
