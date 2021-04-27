import { DownloadInvoiceController } from '@/presentation/controllers'
import { DownloadInvoiceSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockDownloadRequest, throwError } from '@/tests/domain/mocks'
import { badRequest, serverError } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  sut: DownloadInvoiceController,
  validationSpy: ValidationSpy,
  downloadInvoiceSpy: DownloadInvoiceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const downloadInvoiceSpy = new DownloadInvoiceSpy()
  const sut = new DownloadInvoiceController(validationSpy, downloadInvoiceSpy)
  return {
    sut,
    validationSpy,
    downloadInvoiceSpy
  }
}

describe('DownloadInvoice Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockDownloadRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockDownloadRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call DownloadInvoice with correct values', async () => {
    const { sut, downloadInvoiceSpy } = makeSut()
    const request = mockDownloadRequest()
    await sut.handle(request)
    expect(downloadInvoiceSpy.id).toBe(request.id)
    expect(downloadInvoiceSpy.accountId).toBe(request.accountId)
  })

  test('Should return 500 if DownloadInvoice throws ', async () => {
    const { sut, downloadInvoiceSpy } = makeSut()
    jest.spyOn(downloadInvoiceSpy, 'download').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockDownloadRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
