import { DeleteChildrenController } from '@/presentation/controllers'
import { DeleteChildrenSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, notFound } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError } from '@/presentation/errors'

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

  test('Should return 500 if DeleteChildren throws ', async () => {
    const { sut, deleteChildrenSpy } = makeSut()
    jest.spyOn(deleteChildrenSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if record not exists', async () => {
    const { sut, deleteChildrenSpy } = makeSut()
    deleteChildrenSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Children')))
  })
})
