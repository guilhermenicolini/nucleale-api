import { AddChildrenController } from '@/presentation/controllers'
import { ValidationSpy, AddChildrenSpy } from '@/tests/presentation/mocks'
import { mockAddChildrenModel } from '@/tests/domain/mocks'

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
})
