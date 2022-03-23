import { SoapClient, SoapRequest, SoapResponse } from '@/data/protocols'

export const mockSoapRequest = (): SoapRequest => ({
  method: 'any',
  message: 'any',
  responseMethod: 'any',
  url: 'https://site.com.br'
})

export class SoapClientSpy implements SoapClient<any> {
  request: SoapRequest
  result: SoapResponse = {
    success: true,
    response: []
  }

  async send (request: SoapRequest): Promise<SoapResponse> {
    this.request = request
    return this.result
  }
}
