import { DbLoadInvoices } from '@/data/usecases'
import { LoadInvoicesRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockAccountId = (): string => faker.datatype.uuid()

type SutTypes = {
  sut: DbLoadInvoices
  loadInvoicesRepositorySpy: LoadInvoicesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadInvoicesRepositorySpy = new LoadInvoicesRepositorySpy()
  const sut = new DbLoadInvoices(loadInvoicesRepositorySpy)

  return {
    sut,
    loadInvoicesRepositorySpy
  }
}

describe('DbLoadInvoices Usecase', () => {
  test('Should call LoadInvoicesRepository with correct values', async () => {
    const { sut, loadInvoicesRepositorySpy } = makeSut()
    const accountId = mockAccountId()
    await sut.load(accountId)
    expect(loadInvoicesRepositorySpy.accountId).toBe(accountId)
  })

  test('Should throw if LoadInvoicesRepository throws', async () => {
    const { sut, loadInvoicesRepositorySpy } = makeSut()
    jest.spyOn(loadInvoicesRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockAccountId())
    await expect(promise).rejects.toThrow()
  })

  test('Should return invoices on success', async () => {
    const { sut, loadInvoicesRepositorySpy } = makeSut()
    const invoices = await sut.load(mockAccountId())
    expect(invoices).toEqual(loadInvoicesRepositorySpy.result)
  })
})
