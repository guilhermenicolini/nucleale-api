import { CertificateModel } from '@/domain/models'

export interface LoadCertificates {
  load: (accountId: string) => Promise<LoadCertificates.Result>
}

export namespace LoadCertificates {
  export type ResultModel = Omit<CertificateModel, 'id' | 'accountId' >
  export type Result = ResultModel[]
}
