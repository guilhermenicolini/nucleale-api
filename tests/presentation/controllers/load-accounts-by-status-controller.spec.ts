import { LoadAccountsByStatusController } from '@/presentation/controllers'
import { LoadAccountsByStatusSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, badRequest, ok } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { AccountStatus } from '@/domain/models'

const mockRequest = (): LoadAccountsByStatusController.Request => {
  return {
    status: AccountStatus.awaitingVerification
  }
}

type SutTypes = {
  sut: LoadAccountsByStatusController,
  loadAccountsByStatusSpy: LoadAccountsByStatusSpy,
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const loadAccountsByStatusSpy = new LoadAccountsByStatusSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoadAccountsByStatusController(loadAccountsByStatusSpy, validationSpy)
  return {
    sut,
    loadAccountsByStatusSpy,
    validationSpy
  }
}

describe('LoadAccountsByStatus Controller', () => {
  test('Should call LoadAccountByStatus with correct values', async () => {
    const { sut, loadAccountsByStatusSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountsByStatusSpy.params).toEqual(request.status)
  })

  test('Should return 500 if LoadAccountByStatus throws ', async () => {
    const { sut, loadAccountsByStatusSpy } = makeSut()
    jest.spyOn(loadAccountsByStatusSpy, 'loadByStatus').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

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

  test('Should return 200 on success', async () => {
    const { sut, loadAccountsByStatusSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(loadAccountsByStatusSpy.result))
  })
})
