import { CertificateModel } from '@/domain/models'

export interface AddCertificateRepository {
  add: (data: AddCertificateRepository.Params) => Promise<AddCertificateRepository.Result>
}

export namespace AddCertificateRepository {
  export type Params = Omit<CertificateModel, 'id' | 'hash'>
  export type Result = CertificateModel
}
