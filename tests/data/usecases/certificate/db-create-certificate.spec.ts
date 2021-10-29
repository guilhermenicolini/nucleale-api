import { DbCreateCertificate } from '@/data/usecases'
import { RecordNotFoundError } from '@/presentation/errors'

import {
  LoadAccountRepositorySpy,
  LoadProcedureRepositorySpy,
  AddCertificateRepositorySpy
} from '@/tests/data/mocks'
import { mockDbCreateCertificateModel, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbCreateCertificate
  loadAccountRepositorySpy: LoadAccountRepositorySpy,
  loadProcedureRepositorySpy: LoadProcedureRepositorySpy
  addCertificateRepositorySpy: AddCertificateRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountRepositorySpy = new LoadAccountRepositorySpy()
  const loadProcedureRepositorySpy = new LoadProcedureRepositorySpy()
  const addCertificateRepositorySpy = new AddCertificateRepositorySpy()
  const sut = new DbCreateCertificate(
    loadAccountRepositorySpy,
    loadProcedureRepositorySpy,
    addCertificateRepositorySpy
  )

  return {
    sut,
    loadAccountRepositorySpy,
    loadProcedureRepositorySpy,
    addCertificateRepositorySpy
  }
}

describe('DbCreateCertificate Usecase', () => {
  test('Should call LoadAccountRepository with correct values', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    const params = mockDbCreateCertificateModel()
    await sut.create(params)
    expect(loadAccountRepositorySpy.userId).toBe(params.userId)
  })

  test('Should throw if LoadAccountRepository throws', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    jest.spyOn(loadAccountRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.create(mockDbCreateCertificateModel())
    expect(promise).rejects.toThrow()
  })

  test('Should throw error if LoadAccountRepository returns null', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    loadAccountRepositorySpy.result = null
    const promise = sut.create(mockDbCreateCertificateModel())
    expect(promise).rejects.toThrow(new RecordNotFoundError('Conta não encontrada'))
  })

  test('Should call LoadProcedureRepository with correct values', async () => {
    const { sut, loadProcedureRepositorySpy } = makeSut()
    const params = mockDbCreateCertificateModel()
    await sut.create(params)
    expect(loadProcedureRepositorySpy.procedureId).toBe(params.procedureId)
  })

  test('Should throw if LoadProcedureRepository throws', async () => {
    const { sut, loadProcedureRepositorySpy } = makeSut()
    jest.spyOn(loadProcedureRepositorySpy, 'loadProcedure').mockImplementationOnce(throwError)
    const promise = sut.create(mockDbCreateCertificateModel())
    expect(promise).rejects.toThrow()
  })

  test('Should throw error if LoadProcedureRepository returns null', async () => {
    const { sut, loadProcedureRepositorySpy } = makeSut()
    loadProcedureRepositorySpy.result = null
    const promise = sut.create(mockDbCreateCertificateModel())
    expect(promise).rejects.toThrow(new RecordNotFoundError('Procedimento não encontrado'))
  })

  test('Should call AddCertificateRepository with correct values', async () => {
    const { sut, loadAccountRepositorySpy, loadProcedureRepositorySpy, addCertificateRepositorySpy } = makeSut()
    const params = mockDbCreateCertificateModel()
    await sut.create(params)
    expect(addCertificateRepositorySpy.params).toEqual({
      accountId: loadAccountRepositorySpy.result.accountId,
      type: params.type,
      course: loadProcedureRepositorySpy.result.name,
      date: params.date,
      name: loadAccountRepositorySpy.result.name,
      hours: loadProcedureRepositorySpy.result.hours
    })
  })

  test('Should return certificate on success', async () => {
    const { sut, addCertificateRepositorySpy } = makeSut()
    const certificate = await sut.create(mockDbCreateCertificateModel())
    expect(certificate).toEqual(addCertificateRepositorySpy.result)
  })
})
