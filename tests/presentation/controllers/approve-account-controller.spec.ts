import { ApproveAccountController } from '@/presentation/controllers'
import { LoadAccountSpy, SaveAccountSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, notFound, noContent } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError } from '@/presentation/errors'
import { AccountStatus } from '@/domain/models'

import faker from 'faker'

const mockRequest = (): ApproveAccountController.Request => {
  return {
    userId: faker.random.uuid()
  }
}

type SutTypes = {
  sut: ApproveAccountController,
  loadAccountSpy: LoadAccountSpy,
  saveAccountSpy: SaveAccountSpy
}

const makeSut = (): SutTypes => {
  const loadAccountSpy = new LoadAccountSpy()
  const saveAccountSpy = new SaveAccountSpy()
  const sut = new ApproveAccountController(loadAccountSpy, saveAccountSpy)
  return {
    sut,
    loadAccountSpy,
    saveAccountSpy
  }
}

describe('ApproveAccount Controller', () => {
  test('Should call LoadAccount with correct values', async () => {
    const { sut, loadAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountSpy.userId).toBe(request.userId)
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
    expect(saveAccountSpy.userId).toBe(request.userId)
    expect(saveAccountSpy.data).toEqual({
      status: AccountStatus.active
    })
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
