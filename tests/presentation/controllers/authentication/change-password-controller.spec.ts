import { ChangePasswordController } from '@/presentation/controllers'
import { ValidationSpy, ChangePasswordSpy } from '@/tests/presentation/mocks'
import { throwError, mockChangePasswordHttpRequest } from '@/tests/domain/mocks'
import { serverError, badRequest, noContent } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  sut: ChangePasswordController,
  validationSpy: ValidationSpy,
  changePasswordSpy: ChangePasswordSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const changePasswordSpy = new ChangePasswordSpy()
  const sut = new ChangePasswordController(validationSpy, changePasswordSpy)
  return {
    sut,
    validationSpy,
    changePasswordSpy
  }
}

describe('ChangePassword Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockChangePasswordHttpRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockChangePasswordHttpRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call ChangePassword with correct values', async () => {
    const { sut, changePasswordSpy } = makeSut()
    const request = mockChangePasswordHttpRequest()
    await sut.handle(request)
    expect(changePasswordSpy.params).toEqual({
      token: request.token,
      password: request.password
    })
  })

  test('Should return 400 if ChangePassword returns an error ', async () => {
    const { sut, changePasswordSpy } = makeSut()
    changePasswordSpy.result = new Error()
    const httpResponse = await sut.handle(mockChangePasswordHttpRequest())
    expect(httpResponse).toEqual(badRequest(changePasswordSpy.result))
  })

  test('Should return 500 if ChangePassword throws ', async () => {
    const { sut, changePasswordSpy } = makeSut()
    jest.spyOn(changePasswordSpy, 'change').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockChangePasswordHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockChangePasswordHttpRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
