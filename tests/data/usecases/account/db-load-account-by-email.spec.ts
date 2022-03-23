import { DbLoadAccountByEmail } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockEmail = (): string => 'mail@inbox.me'

type SutTypes = {
  sut: DbLoadAccountByEmail,
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbLoadAccountByEmail(loadAccountByEmailRepositorySpy)

  return {
    sut,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbLoadAccountByEmail Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const email = mockEmail()
    await sut.load(email)
    expect(loadAccountByEmailRepositorySpy.email).toBe(email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockEmail())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const result = await sut.load(mockEmail())
    expect(result).toBe(null)
  })

  test('Should return data on success', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const result = await sut.load(mockEmail())
    expect(result).toEqual(loadAccountByEmailRepositorySpy.result)
  })
})
