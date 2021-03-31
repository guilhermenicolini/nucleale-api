import { SignUpController } from '@/presentation/controllers'
import { AddAccountSpy, ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { throwError, mockAddAccountParams } from '@/tests/domain/mocks'
import { serverError, badRequest, conflict, created } from '@/presentation/helpers'
import { ServerError, EmailInUseError } from '@/presentation/errors'

const mockRequest = (): SignUpController.Request => {
  const params = mockAddAccountParams()
  return { ...params, passwordConfirmation: params.password }
}

type SutTypes = {
  sut: SignUpController,
  addAccountSpy: AddAccountSpy,
  validationSpy: ValidationSpy,
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy, authenticationSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { passwordConfirmation, ...obj } = request
    expect(addAccountSpy.params).toEqual({ ...obj, accountId: null })
  })

  test('Should return 500 if AddAccount throws ', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 409 if AddAccount is not valid ', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result.isValid = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(conflict(new EmailInUseError()))
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

  test('Should call Authentication with correct values', async () => {
    const { sut, addAccountSpy, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      accountId: addAccountSpy.result.accountId,
      userId: addAccountSpy.result.userId
    })
  })

  test('Should return 500 if Authentication throws ', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 201 on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(created(authenticationSpy.result))
  })
})
