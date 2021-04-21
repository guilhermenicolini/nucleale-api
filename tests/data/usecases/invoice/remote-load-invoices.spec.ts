import { SoapRequest } from '@/data/protocols'
import { RemoteLoadInvoices } from '@/data/usecases'
import { mockSoapRequest, SoapClientSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: RemoteLoadInvoices
  soapRequest: SoapRequest
  soapClientSpy: SoapClientSpy
}

const makeSut = (): SutTypes => {
  const soapClientSpy = new SoapClientSpy()
  const soapRequest = mockSoapRequest()
  const sut = new RemoteLoadInvoices(soapRequest, soapClientSpy)

  return {
    sut,
    soapRequest,
    soapClientSpy
  }
}

describe('RemoteLoadInvoices Usecase', () => {
  test('Should call SoapClient with correct values', async () => {
    const { sut, soapRequest, soapClientSpy } = makeSut()
    await sut.load()
    expect(soapClientSpy.request).toBe(soapRequest)
  })
})
