import { AddChildrenController } from '@/presentation/controllers'
import { ValidationSpy, AddChildrenSpy } from '@/tests/presentation/mocks'
import { mockAddChildrenModel, throwError } from '@/tests/domain/mocks'
import { badRequest, serverError, created } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  sut: AddChildrenController,
  validationSpy: ValidationSpy,
  addChildrenSpy: AddChildrenSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addChildrenSpy = new AddChildrenSpy()
  const sut = new AddChildrenController(validationSpy, addChildrenSpy)
  return {
    sut,
    validationSpy,
    addChildrenSpy
  }
}

describe('AddChildren Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockAddChildrenModel()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockAddChildrenModel())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddChildren with correct values', async () => {
    const { sut, addChildrenSpy } = makeSut()
    const request = mockAddChildrenModel()
    await sut.handle(request)
    expect(addChildrenSpy.params).toEqual(request)
  })

  test('Should return 500 if AddChildren throws ', async () => {
    const { sut, addChildrenSpy } = makeSut()
    jest.spyOn(addChildrenSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAddChildrenModel())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAddChildrenModel())
    expect(httpResponse).toEqual(created(httpResponse.body))
  })
})
