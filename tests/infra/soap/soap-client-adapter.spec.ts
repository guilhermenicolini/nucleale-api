import { SoapRequest } from '@/data/protocols'
import { SoapClientAdapter } from '@/infra/soap/soap-client-adapter'
import soap from 'soap'

let methodStub: any

jest.mock('soap', () => ({
  createClient: (url: string, cb: any) => cb(null, { any_method: methodStub, any_url: url })
}))

const mockRequest = (): SoapRequest => ({
  message: 'any_message',
  method: 'any_method',
  url: 'any_url'
})

const makeSut = (): SoapClientAdapter => new SoapClientAdapter()

beforeEach(() => {
  methodStub = jest.fn().mockImplementation((message, cb) => cb(null, {}))
})

describe('SoapClient Adapter', () => {
  test('Should call createClient with correct values', async () => {
    const sut = makeSut()
    const soapSpy = jest.spyOn(soap, 'createClient')
    const request = mockRequest()
    await sut.send(request)
    expect(soapSpy).toHaveBeenCalledWith(request.url, expect.any(Function))
  })

  test('Should reject if createClient returns an error', async () => {
    const sut = makeSut()
    jest.spyOn(soap, 'createClient').mockImplementationOnce((url, cb: any) => cb(new Error(), null))
    const promise = sut.send(mockRequest())
    expect(promise).rejects.toThrow(new Error())
  })

  test('Should call client with correct values', async () => {
    const sut = makeSut()
    await sut.send(mockRequest())
    expect(methodStub).toHaveBeenCalledWith('any_message', expect.any(Function))
  })

  test('Should return error if client returns an error', async () => {
    const sut = makeSut()
    methodStub = jest.fn().mockImplementationOnce((message, cb) => cb(new Error(), null))
    const result = await sut.send(mockRequest())
    expect(result).toEqual({
      success: false,
      error: new Error()
    })
  })

  test('Should return true on sucess', async () => {
    const sut = makeSut()
    const result = await sut.send(mockRequest())
    expect(result).toEqual({
      success: true,
      response: {}
    })
  })
})
