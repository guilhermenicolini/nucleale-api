import { DbSearchAccounts } from '@/data/usecases'
import { SearchAccountsRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSearchAccounts,
  searchAccountsRepositorySpy: SearchAccountsRepositorySpy
}

const makeSut = (): SutTypes => {
  const searchAccountsRepositorySpy = new SearchAccountsRepositorySpy()
  const sut = new DbSearchAccounts(searchAccountsRepositorySpy)

  return {
    sut,
    searchAccountsRepositorySpy
  }
}

describe('DbSearchAccounts Usecase', () => {
  test('Should call SearchAccountsRepository with correct values', async () => {
    const { sut, searchAccountsRepositorySpy } = makeSut()
    const term = 'any words'
    await sut.search(term)
    expect(searchAccountsRepositorySpy.term).toBe(term)
  })

  test('Should throw if SearchAccountsRepository throws', async () => {
    const { sut, searchAccountsRepositorySpy } = makeSut()
    jest.spyOn(searchAccountsRepositorySpy, 'search').mockImplementationOnce(throwError)
    const promise = sut.search('any words')
    await expect(promise).rejects.toThrow()
  })

  test('Should return empty array if SearchAccountsRepository returns null', async () => {
    const { sut, searchAccountsRepositorySpy } = makeSut()
    searchAccountsRepositorySpy.result = null
    const result = await sut.search('any words')
    expect(result).toEqual([])
  })

  test('Should return data on success', async () => {
    const { sut, searchAccountsRepositorySpy } = makeSut()
    const result = await sut.search('any words')
    expect(result).toEqual(searchAccountsRepositorySpy.result)
  })
})
