import { DbVerifyAccount } from '@/data/usecases'
import { HashComparerSpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockVerifyAccountParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbVerifyAccount,
  hashComparerSpy: HashComparerSpy,
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hashComparerSpy = new HashComparerSpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbVerifyAccount(hashComparerSpy, loadAccountByEmailRepositorySpy)

  return {
    sut,
    hashComparerSpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbVerifyAccount Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const params = mockVerifyAccountParams()
    await sut.verify(params)
    expect(loadAccountByEmailRepositorySpy.email).toBe(params.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.verify(mockVerifyAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const params = mockVerifyAccountParams()
    await sut.verify(params)
    expect(hashComparerSpy.plainText).toBe(params.password)
    expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.result.password)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.verify(mockVerifyAccountParams())
    await expect(promise).rejects.toThrow()
  })
})
