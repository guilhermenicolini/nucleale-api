import { FileModel } from '@/domain/models'

export interface SendCertificate {
  send: (model: SendCertificate.Model) => Promise<void>
}

export namespace SendCertificate {
  export type Model = {
    email: string
    phone: string
    name: string
    file: FileModel
  }
}
