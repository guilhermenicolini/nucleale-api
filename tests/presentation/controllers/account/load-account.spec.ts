import { LoadAccountController } from '@/presentation/controllers'
import { LoadAccountSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, notFound, ok } from '@/presentation/helpers'
import { RecordNotFoundError, ServerError } from '@/presentation/errors'

import { ObjectId } from 'mongodb'

const mockRequest = (): LoadAccountController.Request => {
  return {
    userId: new ObjectId().toString()
  }
}

type SutTypes = {
  sut: LoadAccountController,
  loadAccountSpy: LoadAccountSpy
}

const makeSut = (): SutTypes => {
  const loadAccountSpy = new LoadAccountSpy()
  const sut = new LoadAccountController(loadAccountSpy)
  return {
    sut,
    loadAccountSpy
  }
}

describe('LoadAccount Controller', () => {
  test('Should call LoadAccount with correct values', async () => {
    const { sut, loadAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountSpy.userId).toEqual(request.userId)
  })

  test('Should return 500 if LoadAccount throws ', async () => {
    const { sut, loadAccountSpy } = makeSut()
    jest.spyOn(loadAccountSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if account not exists', async () => {
    const { sut, loadAccountSpy } = makeSut()
    loadAccountSpy.result = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Conta não encontrada')))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAccountSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(loadAccountSpy.result))
  })
})
