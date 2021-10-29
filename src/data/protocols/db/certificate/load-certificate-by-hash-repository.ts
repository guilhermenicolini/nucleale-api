import { LoadCertificateByHash } from '@/domain/usecases'

export interface LoadCertificateByHashRepository {
  loadByHash: (hash: string) => Promise<LoadCertificateByHashRepository.Result>
}

export namespace LoadCertificateByHashRepository {
  export type Result = LoadCertificateByHash.Result
}
