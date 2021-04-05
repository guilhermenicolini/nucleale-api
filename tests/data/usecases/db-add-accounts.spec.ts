import { DbAddAccount } from '@/data/usecases'
import { HasherSpy, AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount,
  hasherSpy: HasherSpy,
  addAccountRepositorySpy: AddAccountRepositorySpy,
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy)

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct values', async () => {
    const { sut, hasherSpy } = makeSut()
    const params = mockAddAccountParams()
    await sut.add(params)
    expect(hasherSpy.plainText).toBe(params.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const params = mockAddAccountParams()
    await sut.add(params)
    expect(addAccountRepositorySpy.params).toEqual({ ...params, password: hasherSpy.result })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckAccountByEmailRepository with correct values', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const params = mockAddAccountParams()
    await sut.add(params)
    expect(checkAccountByEmailRepositorySpy.email).toBe(params.email)
  })

  test('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const result = await sut.add(mockAddAccountParams())
    expect(result).toEqual({
      isValid: false,
      accountId: null,
      userId: null,
      role: null
    })
  })

  test('Should return account on success', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBe(addAccountRepositorySpy.result)
  })
})
