import { UpdateChildrenController } from '@/presentation/controllers'
import { ValidationSpy, UpdateChildrenSpy } from '@/tests/presentation/mocks'
import { mockUpdateChildrenModel } from '@/tests/domain/mocks'
import { badRequest } from '@/presentation/helpers'

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
})
