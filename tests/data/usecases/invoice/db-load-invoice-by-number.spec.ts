import { DbLoadInvoiceByNumber } from '@/data/usecases'
import { LoadInvoiceByNumberRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadInvoiceByNumber
  loadInvoiceByNumberRepositorySpy: LoadInvoiceByNumberRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadInvoiceByNumberRepositorySpy = new LoadInvoiceByNumberRepositorySpy()
  const sut = new DbLoadInvoiceByNumber(loadInvoiceByNumberRepositorySpy)

  return {
    sut,
    loadInvoiceByNumberRepositorySpy
  }
}

describe('DbLoadInvoiceByNumber Usecase', () => {
  test('Should call LoadInvoiceByNumberRepository with correct values', async () => {
    const { sut, loadInvoiceByNumberRepositorySpy } = makeSut()
    await sut.loadByNumber(1)
    expect(loadInvoiceByNumberRepositorySpy.invoiceNo).toBe(1)
  })

  test('Should throw if LoadInvoiceByNumberRepository throws', async () => {
    const { sut, loadInvoiceByNumberRepositorySpy } = makeSut()
    jest.spyOn(loadInvoiceByNumberRepositorySpy, 'loadByNumber').mockImplementationOnce(throwError)
    const promise = sut.loadByNumber(1)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadInvoiceByNumberRepository returns null', async () => {
    const { sut, loadInvoiceByNumberRepositorySpy } = makeSut()
    loadInvoiceByNumberRepositorySpy.result = null
    const result = await sut.loadByNumber(1)
    expect(result).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadInvoiceByNumberRepositorySpy } = makeSut()
    const result = await sut.loadByNumber(1)
    expect(result).toEqual(loadInvoiceByNumberRepositorySpy.result)
  })
})
