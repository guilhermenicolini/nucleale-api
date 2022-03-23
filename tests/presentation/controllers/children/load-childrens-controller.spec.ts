import { LoadChildrensController } from '@/presentation/controllers'
import { LoadChildrensSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, ok } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

const mockRequest = () => {
  return { accountId: 'any_id' }
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

  test('Should return 500 if LoadChildrens throws ', async () => {
    const { sut, loadChildrensSpy } = makeSut()
    jest.spyOn(loadChildrensSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadChildrensSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadChildrensSpy.result))
  })
})
