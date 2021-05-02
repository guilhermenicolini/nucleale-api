import { DbLoadInvoice } from '@/data/usecases'
import { LoadInvoiceRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadInvoice
  loadInvoiceRepositorySpy: LoadInvoiceRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadInvoiceRepositorySpy = new LoadInvoiceRepositorySpy()
  const sut = new DbLoadInvoice(loadInvoiceRepositorySpy)

  return {
    sut,
    loadInvoiceRepositorySpy
  }
}

describe('DbLoadInvoice Usecase', () => {
  test('Should call LoadInvoiceRepository with correct values', async () => {
    const { sut, loadInvoiceRepositorySpy } = makeSut()
    await sut.load('any_id', 'any_account_id')
    expect(loadInvoiceRepositorySpy.id).toBe('any_id')
    expect(loadInvoiceRepositorySpy.accountId).toBe('any_account_id')
  })

  test('Should throw if LoadInvoiceRepository throws', async () => {
    const { sut, loadInvoiceRepositorySpy } = makeSut()
    jest.spyOn(loadInvoiceRepositorySpy, 'loadOne').mockImplementationOnce(throwError)
    const promise = sut.load('any_id', 'any_account_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadInvoiceRepository returns null', async () => {
    const { sut, loadInvoiceRepositorySpy } = makeSut()
    loadInvoiceRepositorySpy.result = null
    const result = await sut.load('any_id', 'any_account_id')
    expect(result).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadInvoiceRepositorySpy } = makeSut()
    const result = await sut.load('any_id', 'any_account_id')
    expect(result).toEqual(loadInvoiceRepositorySpy.result)
  })
})
