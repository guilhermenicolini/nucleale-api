import { DbLoadAccounts } from '@/data/usecases'
import { LoadAccountsRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import { ObjectId } from 'mongodb'

type SutTypes = {
  sut: DbLoadAccounts,
  loadAccountsRepositorySpy: LoadAccountsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountsRepositorySpy = new LoadAccountsRepositorySpy()
  const sut = new DbLoadAccounts(loadAccountsRepositorySpy)

  return {
    sut,
    loadAccountsRepositorySpy
  }
}

describe('DbLoadAccounts Usecase', () => {
  test('Should call LoadAccountsRepository with correct values', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    const params = {
      accountId: new ObjectId().toString(),
      userId: new ObjectId().toString()
    }
    await sut.loadAll(params.accountId, params.userId)
    expect(loadAccountsRepositorySpy.accountId).toBe(params.accountId)
    expect(loadAccountsRepositorySpy.userId).toBe(params.userId)
  })

  test('Should throw if LoadAccountsRepository throws', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    jest.spyOn(loadAccountsRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.loadAll(new ObjectId().toString(), new ObjectId().toString())
    await expect(promise).rejects.toThrow()
  })

  test('Should return empty array if LoadAccountsRepository returns null', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    loadAccountsRepositorySpy.result = null
    const result = await sut.loadAll(new ObjectId().toString(), new ObjectId().toString())
    expect(result).toEqual([])
  })

  test('Should return data on success', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    const result = await sut.loadAll(new ObjectId().toString(), new ObjectId().toString())
    expect(result).toEqual(loadAccountsRepositorySpy.result)
  })
})
