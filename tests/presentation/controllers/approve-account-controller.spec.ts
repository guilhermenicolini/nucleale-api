import { ApproveAccountController } from '@/presentation/controllers'
import { LoadAccountSpy, SaveAccountSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, notFound, noContent, badRequest } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError, InvalidStatusError } from '@/presentation/errors'
import { AccountStatus } from '@/domain/models'

import { ObjectId } from 'mongodb'

const mockRequest = (): ApproveAccountController.Request => {
  return {
    id: new ObjectId().toString()
  }
}

type SutTypes = {
  sut: ApproveAccountController,
  validationSpy: ValidationSpy,
  loadAccountSpy: LoadAccountSpy,
  saveAccountSpy: SaveAccountSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadAccountSpy = new LoadAccountSpy()
  const saveAccountSpy = new SaveAccountSpy()
  const sut = new ApproveAccountController(validationSpy, loadAccountSpy, saveAccountSpy)
  return {
    sut,
    validationSpy,
    loadAccountSpy,
    saveAccountSpy
  }
}

describe('ApproveAccount Controller', () => {
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

  test('Should call LoadAccount with correct values', async () => {
    const { sut, loadAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountSpy.userId).toBe(request.id)
  })

  test('Should return 500 if LoadAccount throws ', async () => {
    const { sut, loadAccountSpy } = makeSut()
    jest.spyOn(loadAccountSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if LoadAccount return null', async () => {
    const { sut, loadAccountSpy } = makeSut()
    loadAccountSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Account')))
  })

  test('Should call SaveAccount with correct values', async () => {
    const { sut, saveAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveAccountSpy.userId).toBe(request.id)
    expect(saveAccountSpy.data).toEqual({
      status: AccountStatus.active
    })
  })

  test('Should return 400 if account is not awaiting verification ', async () => {
    const { sut, loadAccountSpy } = makeSut()
    loadAccountSpy.result.status = AccountStatus.active
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidStatusError()))
  })

  test('Should return 500 if SaveAccount throws ', async () => {
    const { sut, saveAccountSpy } = makeSut()
    jest.spyOn(saveAccountSpy, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
