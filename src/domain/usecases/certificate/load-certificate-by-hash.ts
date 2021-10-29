import { CertificateModel } from '@/domain/models'

export interface LoadCertificateByHash {
  load: (hash: string) => Promise<LoadCertificateByHash.Result>
}

export namespace LoadCertificateByHash {
  export type Result = CertificateModel
}
