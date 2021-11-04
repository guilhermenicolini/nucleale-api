import { RemoteLoadAddressByZip } from '@/data/usecases'
import env from '@/main/config/env'
import {
  SoapClientSpy
} from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = ():string => faker.address.zipCode()

type SutTypes = {
  sut: RemoteLoadAddressByZip
  soapClientSpy: SoapClientSpy
}

const makeSut = (): SutTypes => {
  const soapClientSpy = new SoapClientSpy()
  const sut = new RemoteLoadAddressByZip(
    soapClientSpy
  )

  return {
    sut,
    soapClientSpy
  }
}

describe('RemoteLoadAddressByZip Usecase', () => {
  test('Should call SoapClient with correct values', async () => {
    const { sut, soapClientSpy } = makeSut()
    const zip = mockRequest()
    await sut.load(zip)
    expect(soapClientSpy.request).toEqual({
      url: env.correios.url,
      method: env.correios.methods.consultaCEP.request,
      responseMethod: env.correios.methods.consultaCEP.response,
      message: {
        cep: zip
      }
    })
  })

  test('Should return null if SoapClient returns false', async () => {
    const { sut, soapClientSpy } = makeSut()
    soapClientSpy.result = {
      success: false,
      error: new Error()
    }
    const result = await sut.load(mockRequest())
    expect(result).toBeFalsy()
  })

  test('Should return null if SoapClient throws', async () => {
    const { sut, soapClientSpy } = makeSut()
    jest.spyOn(soapClientSpy, 'send').mockImplementationOnce(throwError)
    const result = await sut.load(mockRequest())
    expect(result).toBeFalsy()
  })

  test('Should return address on success', async () => {
    const { sut, soapClientSpy } = makeSut()
    soapClientSpy.result = {
      success: true,
      response: {
        end: faker.address.streetAddress(),
        bairro: faker.address.secondaryAddress(),
        cidade: faker.address.cityName(),
        uf: faker.address.stateAbbr()
      }
    }

    const result = await sut.load(mockRequest())
    expect(result).toEqual({
      address: soapClientSpy.result.response.end,
      district: soapClientSpy.result.response.bairro,
      city: soapClientSpy.result.response.cidade,
      state: soapClientSpy.result.response.uf
    })
  })
})
