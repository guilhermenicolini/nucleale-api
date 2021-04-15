import { DbLoadAccountsByStatus } from '@/data/usecases'
import { LoadAccountsByStatusRepositorySpy } from '@/tests/data/mocks'
import { mockLoadAccountsByStatusParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadAccountsByStatus,
  loadAccountsByStatusRepositorySpy: LoadAccountsByStatusRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountsByStatusRepositorySpy = new LoadAccountsByStatusRepositorySpy()
  const sut = new DbLoadAccountsByStatus(loadAccountsByStatusRepositorySpy)

  return {
    sut,
    loadAccountsByStatusRepositorySpy
  }
}

describe('DbLoadAccountsByStatus Usecase', () => {
  test('Should call LoadAccountsByStatusRepository with correct values', async () => {
    const { sut, loadAccountsByStatusRepositorySpy } = makeSut()
    const params = mockLoadAccountsByStatusParams()
    await sut.loadByStatus(params)
    expect(loadAccountsByStatusRepositorySpy.params).toBe(params)
  })

  test('Should throw if LoadAccountsByStatusRepository throws', async () => {
    const { sut, loadAccountsByStatusRepositorySpy } = makeSut()
    jest.spyOn(loadAccountsByStatusRepositorySpy, 'loadByStatus').mockImplementationOnce(throwError)
    const promise = sut.loadByStatus(mockLoadAccountsByStatusParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return empty array if LoadAccountsByStatusRepository returns null', async () => {
    const { sut, loadAccountsByStatusRepositorySpy } = makeSut()
    loadAccountsByStatusRepositorySpy.result = null
    const result = await sut.loadByStatus(mockLoadAccountsByStatusParams())
    expect(result).toEqual([])
  })

  test('Should return data on success', async () => {
    const { sut, loadAccountsByStatusRepositorySpy } = makeSut()
    const result = await sut.loadByStatus(mockLoadAccountsByStatusParams())
    expect(result).toEqual(loadAccountsByStatusRepositorySpy.result)
  })
})
