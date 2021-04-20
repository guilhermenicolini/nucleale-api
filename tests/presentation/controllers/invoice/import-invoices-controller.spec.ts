import { ImportInvoicesController } from '@/presentation/controllers'
import { LoadInvoicesSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  sut: ImportInvoicesController,
  loadInvoicesSpy: LoadInvoicesSpy
}

const makeSut = (): SutTypes => {
  const loadInvoicesSpy = new LoadInvoicesSpy()
  const sut = new ImportInvoicesController(loadInvoicesSpy)
  return {
    sut,
    loadInvoicesSpy
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
})
