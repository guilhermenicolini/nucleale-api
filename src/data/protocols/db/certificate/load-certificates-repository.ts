import { LoadCertificates } from '@/domain/usecases'

export interface LoadCertificatesRepository {
  load: (accountId: string) => Promise<LoadCertificatesRepository.Result>
}

export namespace LoadCertificatesRepository {
  export type Result = LoadCertificates.Result
}
