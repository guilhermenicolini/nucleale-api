import { DbLoadInvoices } from '@/data/usecases'
import { LoadInvoicesRepositorySpy } from '@/tests/data/mocks'

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
})
