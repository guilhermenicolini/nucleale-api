import { LoadAccountsController } from '@/presentation/controllers'
import { LoadAccountsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, ok } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

import { ObjectId } from 'mongodb'

const mockRequest = (): LoadAccountsController.Request => {
  return {
    userId: new ObjectId().toString(),
    accountId: new ObjectId().toString()
  }
}

type SutTypes = {
  sut: LoadAccountsController,
  loadAccountsSpy: LoadAccountsSpy
}

const makeSut = (): SutTypes => {
  const loadAccountsSpy = new LoadAccountsSpy()
  const sut = new LoadAccountsController(loadAccountsSpy)
  return {
    sut,
    loadAccountsSpy
  }
}

describe('LoadAccounts Controller', () => {
  test('Should call LoadAccounts with correct values', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountsSpy.accountId).toEqual(request.accountId)
    expect(loadAccountsSpy.userId).toEqual(request.userId)
  })

  test('Should return 500 if LoadAccount throws ', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    jest.spyOn(loadAccountsSpy, 'loadAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(loadAccountsSpy.result))
  })
})
