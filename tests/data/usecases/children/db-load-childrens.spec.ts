import { DbLoadChildrens } from '@/data/usecases'
import { LoadChildrensRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockAccountId = (): string => faker.random.uuid()

type SutTypes = {
  sut: DbLoadChildrens
  loadChildrensRepositorySpy: LoadChildrensRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadChildrensRepositorySpy = new LoadChildrensRepositorySpy()
  const sut = new DbLoadChildrens(loadChildrensRepositorySpy)

  return {
    sut,
    loadChildrensRepositorySpy
  }
}

describe('DbLoadChildrens Usecase', () => {
  test('Should call LoadChildrensRepository with correct values', async () => {
    const { sut, loadChildrensRepositorySpy } = makeSut()
    const accountId = mockAccountId()
    await sut.load(accountId)
    expect(loadChildrensRepositorySpy.accountId).toBe(accountId)
  })

  test('Should throw if LoadChildrensRepository throws', async () => {
    const { sut, loadChildrensRepositorySpy } = makeSut()
    jest.spyOn(loadChildrensRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockAccountId())
    await expect(promise).rejects.toThrow()
  })

  test('Should return childrens on success', async () => {
    const { sut, loadChildrensRepositorySpy } = makeSut()
    const childrens = await sut.load(mockAccountId())
    expect(childrens).toEqual(loadChildrensRepositorySpy.result)
  })

  test('Should return empty array if LoadChildrensRepository return null', async () => {
    const { sut, loadChildrensRepositorySpy } = makeSut()
    loadChildrensRepositorySpy.result = null
    const childrens = await sut.load(mockAccountId())
    expect(childrens).toEqual([])
  })
})
