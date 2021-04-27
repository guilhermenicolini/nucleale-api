import { DownloadInvoiceController } from '@/presentation/controllers'
import { DownloadInvoiceSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockDownloadRequest } from '@/tests/domain/mocks'
import { badRequest } from '@/presentation/helpers'

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
})
