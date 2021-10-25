import {
  CreateCertificate
} from '@/domain/usecases'
import { mockCertificateModel } from '@/tests/domain/mocks/mock-certificate'

export class CreateCertificateSpy implements CreateCertificate {
  params: CreateCertificate.Params
  result: CreateCertificate.Result = mockCertificateModel()

  async create (params: CreateCertificate.Params): Promise<CreateCertificate.Result> {
    this.params = params
    return this.result
  }
}
