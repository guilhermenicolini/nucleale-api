import { SoapRequest } from '@/data/protocols'
import { SoapClientAdapter } from '@/infra/soap/soap-client-adapter'
import { throwError } from '@/tests/domain/mocks'
import soap from 'soap'
import { SoapParserSpy } from '../mocks'

import faker from 'faker'

let methodStub: any

jest.mock('soap', () => ({
  createClient: (url: string, cb: any) => cb(null, { any_method: methodStub, any_url: url })
}))

const mockRequest = (): SoapRequest => ({
  message: 'any_message',
  method: 'any_method',
  responseMethod: 'any_method',
  url: 'any_url'
})

type SutTypes = {
  sut: SoapClientAdapter
  soapParserSpy: SoapParserSpy
}

const makeSut = (): SutTypes => {
  const soapParserSpy = new SoapParserSpy()
  const sut = new SoapClientAdapter(soapParserSpy)
  return {
    sut,
    soapParserSpy
  }
}

beforeEach(() => {
  methodStub = jest.fn().mockImplementation((message, cb) => cb(null, {
    any_methodReturn: {
      $value: '<?xml>ok</xml>'
    }
  }))
})

describe('SoapClient Adapter', () => {
  test('Should call createClient with correct values', async () => {
    const { sut } = makeSut()
    const soapSpy = jest.spyOn(soap, 'createClient')
    const request = mockRequest()
    await sut.send(request)
    expect(soapSpy).toHaveBeenCalledWith(request.url, expect.any(Function))
  })

  test('Should reject if createClient returns an error', async () => {
    const { sut } = makeSut()
    jest.spyOn(soap, 'createClient').mockImplementationOnce((url, cb: any) => cb(new Error(), null))
    const promise = sut.send(mockRequest())
    expect(promise).rejects.toThrow(new Error())
  })

  test('Should call client with correct values', async () => {
    const { sut } = makeSut()
    await sut.send(mockRequest())
    expect(methodStub).toHaveBeenCalledWith('any_message', expect.any(Function))
  })

  test('Should return error if client returns an error', async () => {
    const { sut } = makeSut()
    methodStub = jest.fn().mockImplementationOnce((message, cb) => cb(new Error(), null))
    const result = await sut.send(mockRequest())
    expect(result).toEqual({
      success: false,
      error: new Error()
    })
  })

  test('Should call Parser with correct values', async () => {
    const { sut, soapParserSpy } = makeSut()
    const data = faker.random.objectElement()
    methodStub = jest.fn().mockImplementationOnce((message, cb) => cb(null, {
      any_method: data
    }))
    await sut.send(mockRequest())
    expect(soapParserSpy.data).toEqual(data)
  })

  test('Should return error if Parser throws', async () => {
    const { sut, soapParserSpy } = makeSut()
    jest.spyOn(soapParserSpy, 'parse').mockImplementation(throwError)
    const result = await sut.send(mockRequest())
    expect(result).toEqual({
      success: false,
      error: new Error()
    })
  })

  // test('Should return error if return method not exists', async () => {
  //   const sut = makeSut()
  //   methodStub = jest.fn().mockImplementationOnce((message, cb) => cb(null, {}))
  //   const result = await sut.send(mockRequest())
  //   expect(result).toEqual({
  //     success: false,
  //     error: new SoapError('missing $value')
  //   })
  // })

  // test('Should return error if return method does not has $value', async () => {
  //   const sut = makeSut()
  //   methodStub = jest.fn().mockImplementationOnce((message, cb) => cb(null, {
  //     any_methodReturn: {}
  //   }))
  //   const result = await sut.send(mockRequest())
  //   expect(result).toEqual({
  //     success: false,
  //     error: new SoapError('missing $value')
  //   })
  // })

  // test('Should return error if return method is not xml', async () => {
  //   const sut = makeSut()
  //   methodStub = jest.fn().mockImplementationOnce((message, cb) => cb(null, {
  //     any_methodReturn: {
  //       $value: 'any_message'
  //     }
  //   }))
  //   const result = await sut.send(mockRequest())
  //   expect(result).toEqual({
  //     success: false,
  //     error: new SoapError('any_message')
  //   })
  // })

  // test('Should return true on sucess', async () => {
  //   const sut = makeSut()
  //   const result = await sut.send(mockRequest())
  //   expect(result).toEqual({
  //     success: true,
  //     response: '<?xml>ok</xml>'
  //   })
  // })
})
