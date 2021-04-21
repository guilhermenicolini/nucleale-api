import { SoapClient, SoapRequest } from '@/data/protocols/soap'
import { LoadInvoices } from '@/domain/usecases'

export class RemoteLoadInvoices implements LoadInvoices {
  constructor (
    private readonly request: SoapRequest,
    private readonly soapClient: SoapClient
  ) { }

  async load (): Promise<LoadInvoices.Result> {
    const soapResponse = await this.soapClient.send(this.request)
    if (!soapResponse.success) {
      throw soapResponse.error
    }
    return soapResponse.response
  }
}

export namespace RemoteLoadInvoices {
  export type Result = LoadInvoices.Result
}
