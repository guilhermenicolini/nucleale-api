import { AuthMiddleware } from '@/presentation/middlewares'
import { forbidden, unauthorized, serverError, ok } from '@/presentation/helpers'
import { AccessDeniedError, InsufficientPermissionError } from '@/presentation/errors'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (): AuthMiddleware.Request => ({
  authorization: 'Bearer any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('Auth Middleware', () => {
  test('Should return 401 if no authorizarion exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should return 401 if authorizarion header is not Bearer', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ authorization: 'any_token' })
    expect(httpResponse).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.authorization.substring(7))
    expect(loadAccountByTokenSpy.role).toBe(role)
  })

  test('Should return 401 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should return 403 if LoadAccountByToken returns invalid account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result.isValid = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InsufficientPermissionError()))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      userId: loadAccountByTokenSpy.result.userId,
      accountId: loadAccountByTokenSpy.result.accountId
    }))
  })
})
