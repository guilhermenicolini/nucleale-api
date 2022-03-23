import { SearchAccountsController } from '@/presentation/controllers'
import { SearchAccountsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, ok } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

const mockRequest = (): SearchAccountsController.Request => {
  return {
    term: 'any words'
  }
}

type SutTypes = {
  sut: SearchAccountsController,
  searchAccountsSpy: SearchAccountsSpy
}

const makeSut = (): SutTypes => {
  const searchAccountsSpy = new SearchAccountsSpy()
  const sut = new SearchAccountsController(searchAccountsSpy)
  return {
    sut,
    searchAccountsSpy
  }
}

describe('SearchAccounts Controller', () => {
  test('Should call SearchAccounts with correct values', async () => {
    const { sut, searchAccountsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(searchAccountsSpy.term).toBe(request.term)
  })

  test('Should return 500 if SearchAccountsSpy throws ', async () => {
    const { sut, searchAccountsSpy } = makeSut()
    jest.spyOn(searchAccountsSpy, 'search').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, searchAccountsSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(searchAccountsSpy.result))
  })
})
