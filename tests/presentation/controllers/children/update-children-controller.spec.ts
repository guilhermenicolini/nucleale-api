import { UpdateChildrenController } from '@/presentation/controllers'
import { ValidationSpy, UpdateChildrenSpy } from '@/tests/presentation/mocks'
import { mockUpdateChildrenModel } from '@/tests/domain/mocks'

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
})
