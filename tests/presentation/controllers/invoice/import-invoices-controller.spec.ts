import { ImportInvoicesController } from '@/presentation/controllers'
import { LoadInvoicesSpy } from '@/tests/presentation/mocks'

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
})
