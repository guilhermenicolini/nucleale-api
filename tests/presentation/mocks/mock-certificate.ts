import {
  CreateCertificate,
  GenerateCertificate,
  SendCertificate,
  LoadCertificateByHash,
  LoadCertificates
} from '@/domain/usecases'
import { mockCertificateModel, mockFileModel, mockLoadCertificate } from '@/tests/domain/mocks/mock-certificate'

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

export class LoadCertificateByHashSpy implements LoadCertificateByHash {
  hash: string
  result: LoadCertificateByHash.Result = mockCertificateModel()

  async load (hash: string): Promise<LoadCertificateByHash.Result> {
    this.hash = hash
    return this.result
  }
}

export class LoadCertificatesSpy implements LoadCertificates {
  accountId: string
  result: LoadCertificates.Result = [
    mockLoadCertificate(),
    mockLoadCertificate()
  ]

  async load (accountId: string): Promise<LoadCertificates.Result> {
    this.accountId = accountId
    return this.result
  }
}
