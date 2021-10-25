import {
  AddCertificateRepository
} from '@/data/protocols'
import { mockCertificateModel } from '@/tests/domain/mocks'

export class AddCertificateRepositorySpy implements AddCertificateRepository {
  params: AddCertificateRepository.Params
  result: AddCertificateRepository.Result = mockCertificateModel()

  async add (params: AddCertificateRepository.Params): Promise<AddCertificateRepository.Result> {
    this.params = params
    return this.result
  }
}
