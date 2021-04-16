import { LoadAddressController } from '@/presentation/controllers'
import { LoadAddressSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, ok } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = () => {
  return { accountId: faker.random.uuid() }
}

type SutTypes = {
  sut: LoadAddressController,
  loadAddressSpy: LoadAddressSpy
}

const makeSut = (): SutTypes => {
  const loadAddressSpy = new LoadAddressSpy()
  const sut = new LoadAddressController(loadAddressSpy)
  return {
    sut,
    loadAddressSpy
  }
}

describe('LoadAddress Controller', () => {
  test('Should call LoadAddress with correct values', async () => {
    const { sut, loadAddressSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAddressSpy.accountId).toEqual(request.accountId)
  })

  test('Should return 500 if LoadAddress throws ', async () => {
    const { sut, loadAddressSpy } = makeSut()
    jest.spyOn(loadAddressSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAddressSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadAddressSpy.result))
  })
})
