import { DbDeleteChildren } from '@/data/usecases'
import { DeleteChildrenRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

const mockParams = () => ({
  accountId: faker.random.uuid(),
  id: faker.random.uuid()
})

type SutTypes = {
  sut: DbDeleteChildren
  deleteChildrenRepositorySpy: DeleteChildrenRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteChildrenRepositorySpy = new DeleteChildrenRepositorySpy()
  const sut = new DbDeleteChildren(deleteChildrenRepositorySpy)

  return {
    sut,
    deleteChildrenRepositorySpy
  }
}

describe('DbDeleteChildren Usecase', () => {
  test('Should call DeleteChildrenRepository with correct values', async () => {
    const { sut, deleteChildrenRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.delete(params)
    expect(deleteChildrenRepositorySpy.params).toEqual(params)
  })
})
