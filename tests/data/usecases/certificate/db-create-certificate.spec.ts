import { DbCreateCertificate } from '@/data/usecases'
import { RecordNotFoundError } from '@/presentation/errors'

import {
  LoadAccountRepositorySpy,
  LoadProcedureRepositorySpy,
  AddCertificateRepositorySpy
} from '@/tests/data/mocks'
import { mockDbCertificateModel, throwError } from '@/tests/domain/mocks'

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
    const params = mockDbCertificateModel()
    await sut.create(params)
    expect(loadAccountRepositorySpy.userId).toBe(params.userId)
  })

  test('Should throw if LoadAccountRepository throws', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    jest.spyOn(loadAccountRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.create(mockDbCertificateModel())
    expect(promise).rejects.toThrow()
  })

  test('Should throw error if LoadAccountRepository returns null', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    loadAccountRepositorySpy.result = null
    const promise = sut.create(mockDbCertificateModel())
    expect(promise).rejects.toThrow(new RecordNotFoundError('Conta não encontrada'))
  })
})
