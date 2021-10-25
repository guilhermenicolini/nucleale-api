import { CertificateModel, CertificateType } from '@/domain/models'

export interface CreateCertificate {
  create: (params: CreateCertificate.Params) => Promise<CreateCertificate.Result>
}

export namespace CreateCertificate {
  export type Params = {
    userId: string
    procedureId: string
    type: CertificateType
    date: number
  }
  export type Result = CertificateModel
}
