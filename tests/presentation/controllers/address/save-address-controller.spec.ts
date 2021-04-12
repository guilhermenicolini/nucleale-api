import { SaveAddressController } from '@/presentation/controllers'
import { SaveAddressSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockAddressModel } from '@/tests/domain/mocks'
import { badRequest } from '@/presentation/helpers'

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

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockAddressModel())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
