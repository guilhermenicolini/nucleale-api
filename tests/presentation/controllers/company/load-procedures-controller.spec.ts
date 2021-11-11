import { LoadProceduresController } from '@/presentation/controllers'
import { LoadProceduresSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { serverError, ok } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  sut: LoadProceduresController,
  loadProceduresSpy: LoadProceduresSpy
}

const makeSut = (): SutTypes => {
  const loadProceduresSpy = new LoadProceduresSpy()
  const sut = new LoadProceduresController(loadProceduresSpy)
  return {
    sut,
    loadProceduresSpy
  }
}

describe('LoadProcedures Controller', () => {
  test('Should call LoadProcedures', async () => {
    const { sut, loadProceduresSpy } = makeSut()
    await sut.handle()
    expect(loadProceduresSpy.calls).toBe(1)
  })

  test('Should return 500 if LoadProcedures throws ', async () => {
    const { sut, loadProceduresSpy } = makeSut()
    jest.spyOn(loadProceduresSpy, 'loadAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProceduresSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadProceduresSpy.result))
  })
})
