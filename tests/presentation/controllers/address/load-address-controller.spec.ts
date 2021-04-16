import { LoadAddressController } from '@/presentation/controllers'
import { LoadAddressSpy } from '@/tests/presentation/mocks'

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
})
