import { ValidateCertificateController } from '@/presentation/controllers'
import { LoadCertificateByHashSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { ok } from '@/presentation/helpers'

import faker from 'faker'

const mockRequest = () => {
  return { hash: faker.random.alphaNumeric(8).toLowerCase() }
}

type SutTypes = {
  sut: ValidateCertificateController,
  loadCertificateByHashSpy: LoadCertificateByHashSpy
}

const makeSut = (): SutTypes => {
  const loadCertificateByHashSpy = new LoadCertificateByHashSpy()
  const sut = new ValidateCertificateController(loadCertificateByHashSpy)
  return {
    sut,
    loadCertificateByHashSpy
  }
}

describe('ValidateCertificate Controller', () => {
  test('Should call LoadCertificateByHash with correct values', async () => {
    const { sut, loadCertificateByHashSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadCertificateByHashSpy.hash).toBe(request.hash)
  })

  test('Should return error if LoadCertificateByHash throws ', async () => {
    const { sut, loadCertificateByHashSpy } = makeSut()
    jest.spyOn(loadCertificateByHashSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).not.toBe(200)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadCertificateByHashSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      hash: loadCertificateByHashSpy.result.hash,
      course: loadCertificateByHashSpy.result.course,
      date: loadCertificateByHashSpy.result.date
    }))
  })
})
