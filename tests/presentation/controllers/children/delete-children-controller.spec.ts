import { DeleteChildrenController } from '@/presentation/controllers'
import { DeleteChildrenSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = () => ({
  accountId: faker.random.uuid(),
  id: faker.random.uuid()
})

type SutTypes = {
  sut: DeleteChildrenController,
  deleteChildrenSpy: DeleteChildrenSpy
}

const makeSut = (): SutTypes => {
  const deleteChildrenSpy = new DeleteChildrenSpy()
  const sut = new DeleteChildrenController(deleteChildrenSpy)
  return {
    sut,
    deleteChildrenSpy
  }
}

describe('DeleteChildren Controller', () => {
  test('Should call DeleteChildren with correct values', async () => {
    const { sut, deleteChildrenSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteChildrenSpy.params).toEqual(request)
  })
})
