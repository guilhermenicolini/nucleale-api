import { DbLoadCertificateByHash } from '@/data/usecases'
import { RecordNotFoundError } from '@/presentation/errors'
import { LoadCertificateByHashRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadCertificateByHash
  loadCertificateByHashRepositorySpy: LoadCertificateByHashRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCertificateByHashRepositorySpy = new LoadCertificateByHashRepositorySpy()
  const sut = new DbLoadCertificateByHash(loadCertificateByHashRepositorySpy)

  return {
    sut,
    loadCertificateByHashRepositorySpy
  }
}

const mockHash = (): string => faker.random.alphaNumeric(8).toLowerCase()

describe('DbLoadCertificateByHash Usecase', () => {
  test('Should call LoadCertificateByHashRepository with correct values', async () => {
    const { sut, loadCertificateByHashRepositorySpy } = makeSut()
    const hash = mockHash()
    await sut.load(hash)
    expect(loadCertificateByHashRepositorySpy.hash).toBe(hash)
  })

  test('Should throw if LoadCertificateByHashRepository throws', async () => {
    const { sut, loadCertificateByHashRepositorySpy } = makeSut()
    jest.spyOn(loadCertificateByHashRepositorySpy, 'loadByHash').mockImplementationOnce(throwError)
    const promise = sut.load(mockHash())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadCertificateByHashRepository returns null', async () => {
    const { sut, loadCertificateByHashRepositorySpy } = makeSut()
    loadCertificateByHashRepositorySpy.result = null
    const promise = sut.load(mockHash())
    await expect(promise).rejects.toThrow(new RecordNotFoundError('Certificado não encontrado'))
  })

  test('Should return certificate on success', async () => {
    const { sut, loadCertificateByHashRepositorySpy } = makeSut()
    const result = await sut.load(mockHash())
    expect(result).toEqual(loadCertificateByHashRepositorySpy.result)
  })
})
