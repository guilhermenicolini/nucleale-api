import { SoapRequest } from '@/data/protocols'
import { RemoteLoadInvoices } from '@/data/usecases'
import { mockSoapRequest, SoapClientSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

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

  test('Should throw if SoapClient throws', async () => {
    const { sut, soapClientSpy } = makeSut()
    jest.spyOn(soapClientSpy, 'send').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return response if SoapClient returns success', async () => {
    const { sut, soapClientSpy } = makeSut()
    const result = await sut.load()
    expect(result).toEqual(soapClientSpy.result.response)
  })
})
