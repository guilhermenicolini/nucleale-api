import { SignUpController } from '@/presentation/controllers'
import { AddAccountSpy, ValidationSpy, GenerateTokenSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, badRequest, ok } from '@/presentation/helpers'
import { ServerError, EmailInUseError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

type SutTypes = {
  sut: SignUpController,
  addAccountSpy: AddAccountSpy,
  validationSpy: ValidationSpy,
  generateTokenSpy: GenerateTokenSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const generateTokenSpy = new GenerateTokenSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy, generateTokenSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy,
    generateTokenSpy
  }
}

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('Should return 500 if AddAccount throws ', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if AddAccount is not valid ', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result.isValid = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new EmailInUseError()))
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

  test('Should call GenerateToken with correct values', async () => {
    const { sut, addAccountSpy, generateTokenSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(generateTokenSpy.params).toEqual({
      accountId: addAccountSpy.result.accountId,
      userId: addAccountSpy.result.userId
    })
  })

  test('Should return 500 if GenerateToken throws ', async () => {
    const { sut, generateTokenSpy } = makeSut()
    jest.spyOn(generateTokenSpy, 'generate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, generateTokenSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(generateTokenSpy.result))
  })
})
