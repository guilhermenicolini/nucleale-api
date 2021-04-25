import { DbSaveInvoice } from '@/data/usecases'
import { SaveInvoiceRepositorySpy } from '@/tests/data/mocks'
import { mockInvoice, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveInvoice
  saveInvoiceRepositorySpy: SaveInvoiceRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveInvoiceRepositorySpy = new SaveInvoiceRepositorySpy()
  const sut = new DbSaveInvoice(saveInvoiceRepositorySpy)

  return {
    sut,
    saveInvoiceRepositorySpy
  }
}

describe('DbSaveInvoice Usecase', () => {
  test('Should call SaveInvoiceRepository with correct values', async () => {
    const { sut, saveInvoiceRepositorySpy } = makeSut()
    const param = mockInvoice()
    await sut.save(param)
    expect(saveInvoiceRepositorySpy.param).toEqual(param)
  })

  test('Should throw if SaveInvoiceRepository throws', async () => {
    const { sut, saveInvoiceRepositorySpy } = makeSut()
    jest.spyOn(saveInvoiceRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockInvoice())
    await expect(promise).rejects.toThrow()
  })
})
