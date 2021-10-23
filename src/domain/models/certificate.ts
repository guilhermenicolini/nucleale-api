export type CertificateModel = {
  id: string
  accountId: string
  date: number
  type: 'online' | 'presencial',
  name: string
  hours: number
  course: string
  hash: string
}
