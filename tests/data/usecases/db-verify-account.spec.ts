import { DbVerifyAccount } from '@/data/usecases'
import { HashComparerSpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockVerifyccountParams } from '@/tests/domain/mocks'

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
  test('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const params = mockVerifyccountParams()
    await sut.verify(params)
    expect(loadAccountByEmailRepositorySpy.email).toBe(params.email)
  })
})
