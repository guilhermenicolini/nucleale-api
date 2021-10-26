import { CertificateModel, FileModel } from '@/domain/models'

export interface GenerateCertificate {
  generate: (data: GenerateCertificate.Data) => Promise<GenerateCertificate.Result>
}

export namespace GenerateCertificate {
  export type Data = CertificateModel
  export type Result = FileModel
}
