import { ImportInvoicesController } from '@/presentation/controllers'
import { LoadInvoicesSpy, SaveInvoiceSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, noContent } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  sut: ImportInvoicesController,
  loadInvoicesSpy: LoadInvoicesSpy,
  saveInvoiceSpy: SaveInvoiceSpy
}

const makeSut = (): SutTypes => {
  const loadInvoicesSpy = new LoadInvoicesSpy()
  const saveInvoiceSpy = new SaveInvoiceSpy()
  const sut = new ImportInvoicesController(loadInvoicesSpy, saveInvoiceSpy)
  return {
    sut,
    loadInvoicesSpy,
    saveInvoiceSpy
  }
}

describe('ImportInvoices Controller', () => {
  test('Should call LoadInvoices with correct values', async () => {
    const { sut, loadInvoicesSpy } = makeSut()
    const spy = jest.spyOn(loadInvoicesSpy, 'load')
    await sut.handle()
    expect(spy).toHaveBeenCalledWith()
  })

  test('Should return 500 if LoadInvoices throws ', async () => {
    const { sut, loadInvoicesSpy } = makeSut()
    jest.spyOn(loadInvoicesSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call SaveInvoice with correct values', async () => {
    const { sut, loadInvoicesSpy, saveInvoiceSpy } = makeSut()
    const saveSpy = jest.spyOn(saveInvoiceSpy, 'save')
    await sut.handle()
    expect(saveSpy).toHaveBeenNthCalledWith(1, loadInvoicesSpy.result[0])
    expect(saveSpy).toHaveBeenNthCalledWith(2, loadInvoicesSpy.result[1])
  })

  test('Should return 500 if SaveInvoice throws', async () => {
    const { sut, saveInvoiceSpy } = makeSut()
    const saveSpy = jest.spyOn(saveInvoiceSpy, 'save')
    saveSpy.mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
    expect(saveSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })
})
