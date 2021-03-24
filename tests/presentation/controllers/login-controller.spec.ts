import { LoginController } from '@/presentation/controllers'
import { VerifyAccountSpy, ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { badRequest, serverError, unauthorized } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { ServerError, InvalidCredentialsError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = (): LoginController.Request => {
  const password = faker.internet.password(20)
  return {
    email: faker.internet.email(),
    password
  }
}

type SutTypes = {
  sut: LoginController,
  verifyAccountSpy: VerifyAccountSpy,
  validationSpy: ValidationSpy,
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const verifyAccountSpy = new VerifyAccountSpy()
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(verifyAccountSpy, validationSpy, authenticationSpy)
  return {
    sut,
    verifyAccountSpy,
    validationSpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
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

  test('Should return 500 if Validation throws ', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call VerifyAccount with correct values', async () => {
    const { sut, verifyAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(verifyAccountSpy.params).toEqual(request)
  })

  test('Should return 500 if VerifyAccount throws', async () => {
    const { sut, verifyAccountSpy } = makeSut()
    jest.spyOn(verifyAccountSpy, 'verify').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 401 if VerifyAccount not returns', async () => {
    const { sut, verifyAccountSpy } = makeSut()
    verifyAccountSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized(new InvalidCredentialsError()))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, verifyAccountSpy, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      accountId: verifyAccountSpy.result.accountId,
      userId: verifyAccountSpy.result.userId
    })
  })
})
