import { CertificateType } from './enums'

export type CertificateModel = {
  id: string
  accountId: string
  date: number
  type: CertificateType,
  name: string
  hours: number
  course: string
  hash: string
}
