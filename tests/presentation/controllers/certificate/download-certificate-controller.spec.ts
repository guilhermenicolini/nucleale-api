import { DownloadCertificateController } from '@/presentation/controllers'
import { ValidationSpy, LoadCertificateByHashSpy, GenerateCertificateSpy } from '@/tests/presentation/mocks'
import { mockDownloadCertificateRequest, throwError } from '@/tests/domain/mocks'
import { badRequest, serverError, notFound, ok } from '@/presentation/helpers'
import { RecordNotFoundError } from '@/presentation/errors'

type SutTypes = {
  sut: DownloadCertificateController,
  validationSpy: ValidationSpy,
  loadCertificateByHashSpy: LoadCertificateByHashSpy,
  generateCertificateSpy: GenerateCertificateSpy
}

const makeSut = (accountId?: string): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadCertificateByHashSpy = new LoadCertificateByHashSpy()
  if (accountId) {
    loadCertificateByHashSpy.result.accountId = accountId
  }
  const generateCertificateSpy = new GenerateCertificateSpy()
  const sut = new DownloadCertificateController(validationSpy, loadCertificateByHashSpy, generateCertificateSpy)
  return {
    sut,
    validationSpy,
    loadCertificateByHashSpy,
    generateCertificateSpy
  }
}

describe('DownloadCertificate Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockDownloadCertificateRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockDownloadCertificateRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call LoadCertificateByHash with correct values', async () => {
    const { sut, loadCertificateByHashSpy } = makeSut()
    const request = mockDownloadCertificateRequest()
    await sut.handle(request)
    expect(loadCertificateByHashSpy.hash).toBe(request.hash)
  })

  test('Should return 500 if LoadCertificateByHash throws', async () => {
    const { sut, loadCertificateByHashSpy } = makeSut()
    jest.spyOn(loadCertificateByHashSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockDownloadCertificateRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 404 if LoadCertificateByHash account id different', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockDownloadCertificateRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Certificado não encontrado')))
  })

  test('Should call GenerateCertificate with correct values', async () => {
    const data = mockDownloadCertificateRequest()
    const { sut, loadCertificateByHashSpy, generateCertificateSpy } = makeSut(data.accountId)
    await sut.handle(data)
    expect(generateCertificateSpy.data).toEqual(loadCertificateByHashSpy.result)
  })

  test('Should return 500 if GenerateCertificate throws', async () => {
    const data = mockDownloadCertificateRequest()
    const { sut, generateCertificateSpy } = makeSut(data.accountId)
    jest.spyOn(generateCertificateSpy, 'generate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(data)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const data = mockDownloadCertificateRequest()
    const { sut, generateCertificateSpy } = makeSut(data.accountId)
    const httpResponse = await sut.handle(data)
    expect(httpResponse).toEqual(ok({
      fileName: generateCertificateSpy.result.name,
      buffer: Buffer.from(generateCertificateSpy.result.base64, 'base64')
    }))
  })
})
