import { SaveAddressController } from '@/presentation/controllers'
import { SaveAddressSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockAddressModel, throwError } from '@/tests/domain/mocks'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

const mockRequest = (accountId?: string) => {
  const address = mockAddressModel(accountId)
  delete address.id
  return address
}

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

  test('Should call SaveAddress with correct values', async () => {
    const { sut, saveAddressSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveAddressSpy.params).toEqual(request)
  })

  test('Should return 500 if SaveAddress throws ', async () => {
    const { sut, saveAddressSpy } = makeSut()
    jest.spyOn(saveAddressSpy, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
