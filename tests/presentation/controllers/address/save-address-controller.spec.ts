import { SaveAddressController } from '@/presentation/controllers'
import { SaveAddressSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockAddressModel } from '@/tests/domain/mocks'

type SutTypes = {
  sut: SaveAddressController,
  validationSpy: ValidationSpy,
  saveAddressSpy: SaveAddressSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveAddressSpy = new SaveAddressSpy()
  const sut = new SaveAddressController(validationSpy, saveAddressSpy)
  return {
    sut,
    validationSpy,
    saveAddressSpy
  }
}

describe('SaveAddress Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockAddressModel()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
