import { CheckPasswordRequestController } from '@/presentation/controllers'
import { ValidationSpy, CheckAccountLinkSpy } from '@/tests/presentation/mocks'
import { throwError, mockCheckPasswordRequest } from '@/tests/domain/mocks'
import { serverError, badRequest, notFound, ok } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError } from '@/presentation/errors'

type SutTypes = {
  sut: CheckPasswordRequestController,
  validationSpy: ValidationSpy,
  checkAccountLinkSpy: CheckAccountLinkSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkAccountLinkSpy = new CheckAccountLinkSpy()
  const sut = new CheckPasswordRequestController(validationSpy, checkAccountLinkSpy)
  return {
    sut,
    validationSpy,
    checkAccountLinkSpy
  }
}

describe('CheckPasswordRequest Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockCheckPasswordRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockCheckPasswordRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call CheckAccountLink with correct values', async () => {
    const { sut, checkAccountLinkSpy } = makeSut()
    const request = mockCheckPasswordRequest()
    await sut.handle(request)
    expect(checkAccountLinkSpy.token).toBe(request.token)
  })

  test('Should return 500 if CheckAccountLink throws ', async () => {
    const { sut, checkAccountLinkSpy } = makeSut()
    jest.spyOn(checkAccountLinkSpy, 'check').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockCheckPasswordRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if CheckAccountLink returns false ', async () => {
    const { sut, checkAccountLinkSpy } = makeSut()
    checkAccountLinkSpy.result = false
    const httpResponse = await sut.handle(mockCheckPasswordRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Token não encontrado')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockCheckPasswordRequest())
    expect(httpResponse).toEqual(ok())
  })
})
