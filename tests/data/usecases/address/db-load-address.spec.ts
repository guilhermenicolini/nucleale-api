import { DbLoadAddress } from '@/data/usecases'
import { LoadAddressRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

const mockAccountId = (): string => faker.random.uuid()

type SutTypes = {
  sut: DbLoadAddress
  loadAddressRepositorySpy: LoadAddressRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAddressRepositorySpy = new LoadAddressRepositorySpy()
  const sut = new DbLoadAddress(loadAddressRepositorySpy)

  return {
    sut,
    loadAddressRepositorySpy
  }
}

describe('DbLoadAddress Usecase', () => {
  test('Should call LoadAddressRepository with correct values', async () => {
    const { sut, loadAddressRepositorySpy } = makeSut()
    const accountId = mockAccountId()
    await sut.load(accountId)
    expect(loadAddressRepositorySpy.accountId).toBe(accountId)
  })
})
