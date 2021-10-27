import { IoGenerateCertificate } from '@/data/usecases'
import { GenerateCertificate } from '@/domain/usecases'
import { makeCertificateConverter } from '@/main/factories'

export const makeIoGenerateCertificate = (): GenerateCertificate => {
  return new IoGenerateCertificate(
    makeCertificateConverter()
  )
}
