import {
  CreateCertificate,
  GenerateCertificate
} from '@/domain/usecases'
import { mockCertificateModel, mockFileModel } from '@/tests/domain/mocks/mock-certificate'

export class CreateCertificateSpy implements CreateCertificate {
  params: CreateCertificate.Params
  result: CreateCertificate.Result = mockCertificateModel()

  async create (params: CreateCertificate.Params): Promise<CreateCertificate.Result> {
    this.params = params
    return this.result
  }
}

export class GenerateCertificateSpy implements GenerateCertificate {
  model: GenerateCertificate.Model
  result: GenerateCertificate.Result = mockFileModel()

  async generate (model: GenerateCertificate.Model): Promise<GenerateCertificate.Result> {
    this.model = model
    return this.result
  }
}
