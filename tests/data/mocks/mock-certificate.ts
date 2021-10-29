import {
  AddCertificateRepository,
  LoadCertificateByHashRepository,
  LoadCertificatesRepository
} from '@/data/protocols'
import { mockCertificateModel, mockLoadCertificate } from '@/tests/domain/mocks'

export class AddCertificateRepositorySpy implements AddCertificateRepository {
  params: AddCertificateRepository.Params
  result: AddCertificateRepository.Result = mockCertificateModel()

  async add (params: AddCertificateRepository.Params): Promise<AddCertificateRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadCertificateByHashRepositorySpy implements LoadCertificateByHashRepository {
  hash: string
  result: LoadCertificateByHashRepository.Result = mockCertificateModel()

  async loadByHash (hash: string): Promise<LoadCertificateByHashRepository.Result> {
    this.hash = hash
    return this.result
  }
}

export class LoadCertificatesRepositorySpy implements LoadCertificatesRepository {
  accountId: string
  result: LoadCertificatesRepository.Result = [
    mockLoadCertificate(),
    mockLoadCertificate()
  ]

  async load (accountId: string): Promise<LoadCertificatesRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}
