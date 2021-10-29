import { LoadCertificatesController } from '@/presentation/controllers'
import { LoadCertificatesSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, ok } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = () => {
  return { accountId: faker.datatype.uuid() }
}

type SutTypes = {
  sut: LoadCertificatesController,
  loadCertificatesSpy: LoadCertificatesSpy
}

const makeSut = (): SutTypes => {
  const loadCertificatesSpy = new LoadCertificatesSpy()
  const sut = new LoadCertificatesController(loadCertificatesSpy)
  return {
    sut,
    loadCertificatesSpy
  }
}

describe('LoadCertificates Controller', () => {
  test('Should call LoadCertificates with correct values', async () => {
    const { sut, loadCertificatesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadCertificatesSpy.accountId).toEqual(request.accountId)
  })

  test('Should return 500 if LoadCertificates throws ', async () => {
    const { sut, loadCertificatesSpy } = makeSut()
    jest.spyOn(loadCertificatesSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadCertificatesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadCertificatesSpy.result))
  })
})
