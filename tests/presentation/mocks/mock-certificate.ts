import {
  CreateCertificate,
  GenerateCertificate,
  SendCertificate
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
  data: GenerateCertificate.Data
  result: GenerateCertificate.Result = mockFileModel()

  async generate (data: GenerateCertificate.Data): Promise<GenerateCertificate.Result> {
    this.data = data
    return this.result
  }
}

export class SendCertificateSpy implements SendCertificate {
  model: SendCertificate.Model

  async send (model: SendCertificate.Model): Promise<void> {
    this.model = model
  }
}
