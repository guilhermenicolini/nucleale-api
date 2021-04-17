import { DbAddChildren } from '@/data/usecases'
import { AddChildrenRepositorySpy } from '@/tests/data/mocks'
import { mockAddChildrenModel, throwError } from '@/tests/domain/mocks'

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

  test('Should throw if AddChildrenRepository throws', async () => {
    const { sut, addChildrenRepositorySpy } = makeSut()
    jest.spyOn(addChildrenRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddChildrenModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an id on success', async () => {
    const { sut, addChildrenRepositorySpy } = makeSut()
    const id = await sut.add(mockAddChildrenModel())
    expect(id).toEqual(addChildrenRepositorySpy.result)
  })
})
