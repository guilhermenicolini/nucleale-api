import { DbLoadCertificates } from '@/data/usecases'
import { LoadCertificatesRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockAccountId = (): string => faker.datatype.uuid()

type SutTypes = {
  sut: DbLoadCertificates
  loadCertificatesRepositorySpy: LoadCertificatesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCertificatesRepositorySpy = new LoadCertificatesRepositorySpy()
  const sut = new DbLoadCertificates(loadCertificatesRepositorySpy)

  return {
    sut,
    loadCertificatesRepositorySpy
  }
}

describe('DbLoadCertificates Usecase', () => {
  test('Should call LoadCertificatesRepository with correct values', async () => {
    const { sut, loadCertificatesRepositorySpy } = makeSut()
    const accountId = mockAccountId()
    await sut.load(accountId)
    expect(loadCertificatesRepositorySpy.accountId).toBe(accountId)
  })

  test('Should throw if LoadCertificatesRepository throws', async () => {
    const { sut, loadCertificatesRepositorySpy } = makeSut()
    jest.spyOn(loadCertificatesRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockAccountId())
    await expect(promise).rejects.toThrow()
  })

  test('Should return certificates on success', async () => {
    const { sut, loadCertificatesRepositorySpy } = makeSut()
    const certificates = await sut.load(mockAccountId())
    expect(certificates).toEqual(loadCertificatesRepositorySpy.result)
  })

  test('Should return empty array if LoadCertificatesRepository returns null', async () => {
    const { sut, loadCertificatesRepositorySpy } = makeSut()
    loadCertificatesRepositorySpy.result = null
    const certificates = await sut.load(mockAccountId())
    expect(certificates).toEqual([])
  })
})
