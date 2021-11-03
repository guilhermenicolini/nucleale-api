import { LoadAddressByZipController } from '@/presentation/controllers'
import {
  ValidationSpy,
  LoadAddressByZipSpy
} from '@/tests/presentation/mocks'
import { badRequest, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { ServerError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = (): LoadAddressByZipController.Request => ({
  zip: faker.address.zipCode('########')
})

type SutTypes = {
  sut: LoadAddressByZipController,
  validationSpy: ValidationSpy,
  loadAddressByZipSpy: LoadAddressByZipSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadAddressByZipSpy = new LoadAddressByZipSpy()
  const sut = new LoadAddressByZipController(
    validationSpy,
    loadAddressByZipSpy)
  return {
    sut,
    validationSpy,
    loadAddressByZipSpy
  }
}

describe('LoadAddressByZip Controllerr', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual({
      zip: request.zip
    })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call LoadAddressByZip with correct values', async () => {
    const { sut, loadAddressByZipSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAddressByZipSpy.zip).toBe(request.zip)
  })

  test('Should return 200 if LoadAddressByZip returns null', async () => {
    const { sut, loadAddressByZipSpy } = makeSut()
    loadAddressByZipSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 500 if LoadAccount throws', async () => {
    const { sut, loadAddressByZipSpy } = makeSut()
    jest.spyOn(loadAddressByZipSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAddressByZipSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(loadAddressByZipSpy.result)
  })
})
