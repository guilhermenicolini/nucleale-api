import { UpdateChildrenController } from '@/presentation/controllers'
import { ValidationSpy, UpdateChildrenSpy } from '@/tests/presentation/mocks'
import { mockUpdateChildrenModel, throwError } from '@/tests/domain/mocks'
import { badRequest, serverError, notFound, noContent } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError } from '@/presentation/errors'

type SutTypes = {
  sut: UpdateChildrenController,
  validationSpy: ValidationSpy,
  updateChildrenSpy: UpdateChildrenSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateChildrenSpy = new UpdateChildrenSpy()
  const sut = new UpdateChildrenController(validationSpy, updateChildrenSpy)
  return {
    sut,
    validationSpy,
    updateChildrenSpy
  }
}

describe('UpdateChildren Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockUpdateChildrenModel()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockUpdateChildrenModel())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call UpdateChildren with correct values', async () => {
    const { sut, updateChildrenSpy } = makeSut()
    const request = mockUpdateChildrenModel()
    await sut.handle(request)
    expect(updateChildrenSpy.params).toEqual(request)
  })

  test('Should return 500 if UpdateChildren throws ', async () => {
    const { sut, updateChildrenSpy } = makeSut()
    jest.spyOn(updateChildrenSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockUpdateChildrenModel())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 on fail', async () => {
    const { sut, updateChildrenSpy } = makeSut()
    updateChildrenSpy.result = false
    const httpResponse = await sut.handle(mockUpdateChildrenModel())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Children')))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockUpdateChildrenModel())
    expect(httpResponse).toEqual(noContent())
  })
})
