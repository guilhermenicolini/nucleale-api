import { DeleteChildrenController } from '@/presentation/controllers'
import { DeleteChildrenSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, badRequest, notFound, noContent } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError } from '@/presentation/errors'

const mockRequest = () => ({
  accountId: 'any_id',
  id: 'any_id'
})

type SutTypes = {
  sut: DeleteChildrenController,
  validationSpy: ValidationSpy
  deleteChildrenSpy: DeleteChildrenSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const deleteChildrenSpy = new DeleteChildrenSpy()
  const sut = new DeleteChildrenController(validationSpy, deleteChildrenSpy)
  return {
    sut,
    validationSpy,
    deleteChildrenSpy
  }
}

describe('DeleteChildren Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

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
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Filho não encontrado')))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
