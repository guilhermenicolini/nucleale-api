import { DbUpdateChildren } from '@/data/usecases'
import { UpdateChildrenRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateChildrenModel, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateChildren
  updateChildrenRepositorySpy: UpdateChildrenRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateChildrenRepositorySpy = new UpdateChildrenRepositorySpy()
  const sut = new DbUpdateChildren(updateChildrenRepositorySpy)

  return {
    sut,
    updateChildrenRepositorySpy
  }
}

describe('DbUpdateChildren Usecase', () => {
  test('Should call UpdateChildrenRepository with correct values', async () => {
    const { sut, updateChildrenRepositorySpy } = makeSut()
    const params = mockUpdateChildrenModel()
    await sut.update(params)
    expect(updateChildrenRepositorySpy.params).toEqual(params)
  })

  test('Should throw if UpdateChildrenRepository throws', async () => {
    const { sut, updateChildrenRepositorySpy } = makeSut()
    jest.spyOn(updateChildrenRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateChildrenModel())
    await expect(promise).rejects.toThrow()
  })
})
