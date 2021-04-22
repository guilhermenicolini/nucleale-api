import { UploadInvoicesController } from '@/presentation/controllers'
import { LoadInvoicesFromFileSpy, SaveInvoiceSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockXmlBuffer, throwError } from '@/tests/domain/mocks'
import { serverError, noContent } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

const mockRequest = (): UploadInvoicesController.Request => ({
  files: [mockXmlBuffer()]
})

type SutTypes = {
  sut: UploadInvoicesController,
  validationSpy: ValidationSpy,
  loadInvoicesFromFileSpy: LoadInvoicesFromFileSpy,
  saveInvoiceSpy: SaveInvoiceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadInvoicesFromFileSpy = new LoadInvoicesFromFileSpy()
  const saveInvoiceSpy = new SaveInvoiceSpy()
  const sut = new UploadInvoicesController(validationSpy, loadInvoicesFromFileSpy, saveInvoiceSpy)
  return {
    sut,
    validationSpy,
    loadInvoicesFromFileSpy,
    saveInvoiceSpy
  }
}

describe('UploadInvoices Controller', () => {
  // test('Should call LoadInvoicesFromFile with correct values', async () => {
  //   const { sut, loadInvoicesFromFileSpy } = makeSut()
  //   const request = mockRequest()
  //   await sut.handle(request)
  //   expect(loadInvoicesFromFileSpy).toHaveBeenCalledWith(request.files[0])
  // })

  test('Should return 500 if LoadInvoices throws ', async () => {
    const { sut, loadInvoicesFromFileSpy } = makeSut()
    jest.spyOn(loadInvoicesFromFileSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call SaveInvoice with correct values', async () => {
    const { sut, loadInvoicesFromFileSpy, saveInvoiceSpy } = makeSut()
    const saveSpy = jest.spyOn(saveInvoiceSpy, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenNthCalledWith(1, loadInvoicesFromFileSpy.result[0])
    expect(saveSpy).toHaveBeenNthCalledWith(2, loadInvoicesFromFileSpy.result[1])
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
