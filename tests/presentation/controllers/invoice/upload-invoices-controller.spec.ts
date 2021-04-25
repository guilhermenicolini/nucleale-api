import { UploadInvoicesController } from '@/presentation/controllers'
import { LoadInvoicesFromBufferSpy, SaveInvoiceSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockXmlFileBuffer, throwError } from '@/tests/domain/mocks'
import { serverError, badRequest, noContent } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

const mockRequest = (): UploadInvoicesController.Request => ({
  files: [mockXmlFileBuffer()]
})

type SutTypes = {
  sut: UploadInvoicesController,
  validationSpy: ValidationSpy,
  loadInvoicesFromBufferSpy: LoadInvoicesFromBufferSpy,
  saveInvoiceSpy: SaveInvoiceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadInvoicesFromBufferSpy = new LoadInvoicesFromBufferSpy()
  const saveInvoiceSpy = new SaveInvoiceSpy()
  const sut = new UploadInvoicesController(validationSpy, loadInvoicesFromBufferSpy, saveInvoiceSpy)
  return {
    sut,
    validationSpy,
    loadInvoicesFromBufferSpy,
    saveInvoiceSpy
  }
}

describe('UploadInvoices Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call LoadInvoicesFromBuffer with correct values', async () => {
    const { sut, loadInvoicesFromBufferSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadInvoicesFromBufferSpy.buffer).toEqual(request.files[0].buffer)
  })

  test('Should return 500 if LoadInvoices throws ', async () => {
    const { sut, loadInvoicesFromBufferSpy } = makeSut()
    jest.spyOn(loadInvoicesFromBufferSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call SaveInvoice with correct values', async () => {
    const { sut, loadInvoicesFromBufferSpy, saveInvoiceSpy } = makeSut()
    const saveSpy = jest.spyOn(saveInvoiceSpy, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenNthCalledWith(1, loadInvoicesFromBufferSpy.result[0])
    expect(saveSpy).toHaveBeenNthCalledWith(2, loadInvoicesFromBufferSpy.result[1])
  })

  test('Should return 500 if SaveInvoice throws', async () => {
    const { sut, saveInvoiceSpy } = makeSut()
    const saveSpy = jest.spyOn(saveInvoiceSpy, 'save')
    saveSpy.mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
    expect(saveSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
