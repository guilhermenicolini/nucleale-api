import { PasswordRecoveryController } from '@/presentation/controllers'
import { ValidationSpy, LoadAccountByEmailSpy, GeneratePasswordRecoveryLinkSpy } from '@/tests/presentation/mocks'
import { throwError, mockPasswordRecoveryRequest } from '@/tests/domain/mocks'
import { serverError, badRequest, notFound, noContent } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError } from '@/presentation/errors'

type SutTypes = {
  sut: PasswordRecoveryController,
  validationSpy: ValidationSpy,
  loadAccountByEmailSpy: LoadAccountByEmailSpy,
  generatePasswordRecoveryLinkSpy: GeneratePasswordRecoveryLinkSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadAccountByEmailSpy = new LoadAccountByEmailSpy()
  const generatePasswordRecoveryLinkSpy = new GeneratePasswordRecoveryLinkSpy()
  const sut = new PasswordRecoveryController(validationSpy, loadAccountByEmailSpy, generatePasswordRecoveryLinkSpy)
  return {
    sut,
    validationSpy,
    loadAccountByEmailSpy,
    generatePasswordRecoveryLinkSpy
  }
}

describe('PasswordRecovery Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockPasswordRecoveryRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockPasswordRecoveryRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    const request = mockPasswordRecoveryRequest()
    await sut.handle(request)
    expect(loadAccountByEmailSpy.email).toBe(request.email)
  })

  test('Should return 500 if LoadAccountByEmail throws ', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    jest.spyOn(loadAccountByEmailSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockPasswordRecoveryRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if LoadAccountByEmail returns null ', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    loadAccountByEmailSpy.result = null
    const httpResponse = await sut.handle(mockPasswordRecoveryRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('E-mail não encontrado')))
  })

  test('Should call GeneratePasswordRecoveryLink with correct values', async () => {
    const { sut, loadAccountByEmailSpy, generatePasswordRecoveryLinkSpy } = makeSut()
    await sut.handle(mockPasswordRecoveryRequest())
    expect(generatePasswordRecoveryLinkSpy.account).toEqual(loadAccountByEmailSpy.result)
  })

  test('Should return 500 if GeneratePasswordRecoveryLink throws ', async () => {
    const { sut, generatePasswordRecoveryLinkSpy } = makeSut()
    jest.spyOn(generatePasswordRecoveryLinkSpy, 'generate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockPasswordRecoveryRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockPasswordRecoveryRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
