import { DbAddChildren } from '@/data/usecases'
import { AddChildrenRepositorySpy } from '@/tests/data/mocks'
import { mockAddChildrenModel } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddChildren
  addChildrenRepositorySpy: AddChildrenRepositorySpy
}

const makeSut = (): SutTypes => {
  const addChildrenRepositorySpy = new AddChildrenRepositorySpy()
  const sut = new DbAddChildren(addChildrenRepositorySpy)

  return {
    sut,
    addChildrenRepositorySpy
  }
}

describe('DbAddChildren Usecase', () => {
  test('Should call AddChildrenRepository with correct values', async () => {
    const { sut, addChildrenRepositorySpy } = makeSut()
    const params = mockAddChildrenModel()
    await sut.add(params)
    expect(addChildrenRepositorySpy.params).toEqual(params)
  })
})
