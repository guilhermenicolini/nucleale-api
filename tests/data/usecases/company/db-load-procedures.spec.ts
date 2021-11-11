import { DbLoadProcedures } from '@/data/usecases'
import { LoadProceduresRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadProcedures
  loadProceduresRepositorySpy: LoadProceduresRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProceduresRepositorySpy = new LoadProceduresRepositorySpy()
  const sut = new DbLoadProcedures(loadProceduresRepositorySpy)

  return {
    sut,
    loadProceduresRepositorySpy
  }
}

describe('DbLoadProcedures Usecase', () => {
  test('Should call LoadProceduresRepository with correct values', async () => {
    const { sut, loadProceduresRepositorySpy } = makeSut()
    await sut.loadAll()
    expect(loadProceduresRepositorySpy.calls).toBe(1)
  })

  test('Should throw if LoadProceduresRepository throws', async () => {
    const { sut, loadProceduresRepositorySpy } = makeSut()
    jest.spyOn(loadProceduresRepositorySpy, 'loadProcedures').mockImplementationOnce(throwError)
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('Should return procedures on success', async () => {
    const { sut, loadProceduresRepositorySpy } = makeSut()
    const procedures = await sut.loadAll()
    expect(procedures).toEqual(loadProceduresRepositorySpy.result)
  })

  test('Should return empty array if LoadProceduresRepository returns null', async () => {
    const { sut, loadProceduresRepositorySpy } = makeSut()
    loadProceduresRepositorySpy.result = null
    const procedures = await sut.loadAll()
    expect(procedures).toEqual([])
  })
})
