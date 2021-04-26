import { LoadInvoicesController } from '@/presentation/controllers'
import { LoadInvoicesSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = () => {
  return { accountId: faker.datatype.uuid() }
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
})
