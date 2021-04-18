import { LoadChildrensController } from '@/presentation/controllers'
import { LoadChildrensSpy } from '@/tests/presentation/mocks'
// import { throwError } from '@/tests/domain/mocks'
// import { serverError, ok } from '@/presentation/helpers'
// import { ServerError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = () => {
  return { accountId: faker.random.uuid() }
}

type SutTypes = {
  sut: LoadChildrensController,
  loadChildrensSpy: LoadChildrensSpy
}

const makeSut = (): SutTypes => {
  const loadChildrensSpy = new LoadChildrensSpy()
  const sut = new LoadChildrensController(loadChildrensSpy)
  return {
    sut,
    loadChildrensSpy
  }
}

describe('LoadChildrens Controller', () => {
  test('Should call LoadChildrens with correct values', async () => {
    const { sut, loadChildrensSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadChildrensSpy.accountId).toEqual(request.accountId)
  })
})
