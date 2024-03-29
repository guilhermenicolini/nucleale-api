import { DbDeleteChildren } from '@/data/usecases'
import { DeleteChildrenRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockParams = () => ({
  accountId: 'any_id',
  id: 'any_id'
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

  test('Should throw if DeleteChildrenRepository throws', async () => {
    const { sut, deleteChildrenRepositorySpy } = makeSut()
    jest.spyOn(deleteChildrenRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(mockParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if DeleteChildrenRepository returns false', async () => {
    const { sut, deleteChildrenRepositorySpy } = makeSut()
    deleteChildrenRepositorySpy.result = false
    const result = await sut.delete(mockParams())
    expect(result).toBe(false)
  })

  test('Should return true if DeleteChildrenRepository returns true', async () => {
    const { sut } = makeSut()
    const result = await sut.delete(mockParams())
    expect(result).toBe(true)
  })
})
