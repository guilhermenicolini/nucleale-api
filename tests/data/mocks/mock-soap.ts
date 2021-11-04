import { SoapClient, SoapRequest, SoapResponse } from '@/data/protocols'

import faker from 'faker'

export const mockSoapRequest = (): SoapRequest => ({
  method: faker.random.word(),
  message: faker.random.word(),
  responseMethod: faker.random.word(),
  url: faker.internet.url()
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
