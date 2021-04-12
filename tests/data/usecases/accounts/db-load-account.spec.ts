import { DbLoadAccount } from '@/data/usecases'
import { LoadAccountRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadAccount
  loadAccountRepositorySpy: LoadAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountRepositorySpy = new LoadAccountRepositorySpy()
  const sut = new DbLoadAccount(loadAccountRepositorySpy)

  return {
    sut,
    loadAccountRepositorySpy
  }
}

describe('DbLoadAccount Usecase', () => {
  test('Should call LoadAccountRepository with correct values', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    await sut.load('any_id')
    expect(loadAccountRepositorySpy.userId).toBe('any_id')
  })

  test('Should throw if LoadAccountRepository throws', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    jest.spyOn(loadAccountRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountRepository returns null', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    loadAccountRepositorySpy.result = null
    const result = await sut.load('any_id')
    expect(result).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    const result = await sut.load('any_id')
    expect(result).toBe(loadAccountRepositorySpy.result)
  })
})
