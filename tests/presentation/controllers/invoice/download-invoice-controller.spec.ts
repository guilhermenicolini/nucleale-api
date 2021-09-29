import { DownloadInvoiceController } from '@/presentation/controllers'
import { LoadInvoiceSpy, GenerateInvoiceSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockDownloadRequest, throwError } from '@/tests/domain/mocks'
import { badRequest, serverError, notFound, ok } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError } from '@/presentation/errors'

type SutTypes = {
  sut: DownloadInvoiceController,
  validationSpy: ValidationSpy,
  loadInvoiceSpy: LoadInvoiceSpy,
  generateInvoiceSpy: GenerateInvoiceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const generateInvoiceSpy = new GenerateInvoiceSpy()
  const loadInvoiceSpy = new LoadInvoiceSpy()
  const sut = new DownloadInvoiceController(validationSpy, loadInvoiceSpy, generateInvoiceSpy)
  return {
    sut,
    validationSpy,
    loadInvoiceSpy,
    generateInvoiceSpy
  }
}

describe('DownloadInvoice Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockDownloadRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockDownloadRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call LoadInvoice with correct values', async () => {
    const { sut, loadInvoiceSpy } = makeSut()
    const request = mockDownloadRequest()
    await sut.handle(request)
    expect(loadInvoiceSpy.invoiceNo).toBe(parseInt(request.invoiceNo))
    expect(loadInvoiceSpy.accountId).toBe(request.accountId)
  })

  test('Should return 500 if LoadInvoice throws', async () => {
    const { sut, loadInvoiceSpy } = makeSut()
    jest.spyOn(loadInvoiceSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockDownloadRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if LoadInvoice returns null', async () => {
    const { sut, loadInvoiceSpy } = makeSut()
    loadInvoiceSpy.result = null
    const httpResponse = await sut.handle(mockDownloadRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Nota fiscal não encontrada')))
  })

  test('Should call GenerateInvoice with correct values', async () => {
    const { sut, loadInvoiceSpy, generateInvoiceSpy } = makeSut()
    await sut.handle(mockDownloadRequest())
    expect(generateInvoiceSpy.model).toEqual(loadInvoiceSpy.result)
  })

  test('Should return 500 if GenerateInvoice throws', async () => {
    const { sut, generateInvoiceSpy } = makeSut()
    jest.spyOn(generateInvoiceSpy, 'generate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockDownloadRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, generateInvoiceSpy } = makeSut()
    const httpResponse = await sut.handle(mockDownloadRequest())
    expect(httpResponse).toEqual(ok(generateInvoiceSpy.result))
  })
})
