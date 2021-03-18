import { DbAddAccount } from '@/data/usecases'
import { HasherSpy } from '@/tests/data/mocks'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount,
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const sut = new DbAddAccount(hasherSpy)

  return {
    sut,
    hasherSpy
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
})
