import { LoadInvoicesController } from '@/presentation/controllers'
import { LoadInvoicesSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, ok } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

const mockRequest = () => {
  return { accountId: 'any_id' }
}

type SutTypes = {
  sut: LoadInvoicesController,
  loadInvoicesSpy: LoadInvoicesSpy
}

const makeSut = (): SutTypes => {
  const loadInvoicesSpy = new LoadInvoicesSpy()
  const sut = new LoadInvoicesController(loadInvoicesSpy)
  return {
    sut,
    loadInvoicesSpy
  }
}

describe('LoadInvoices Controller', () => {
  test('Should call LoadInvoices with correct values', async () => {
    const { sut, loadInvoicesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadInvoicesSpy.accountId).toEqual(request.accountId)
  })

  test('Should return 500 if LoadInvoices throws ', async () => {
    const { sut, loadInvoicesSpy } = makeSut()
    jest.spyOn(loadInvoicesSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadInvoicesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadInvoicesSpy.result))
  })
})
