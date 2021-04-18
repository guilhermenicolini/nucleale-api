import { DbLoadChildrens } from '@/data/usecases'
import { LoadChildrensRepositorySpy } from '@/tests/data/mocks'

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
})
