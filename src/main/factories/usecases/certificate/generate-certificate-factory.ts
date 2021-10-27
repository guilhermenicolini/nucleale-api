import { IoGenerateCertificate } from '@/data/usecases'
import { GenerateCertificate } from '@/domain/usecases'
import { CertificateConverter } from '@/infra/converters'
import { MomentAdapter } from '@/infra/manipulation'

export const makeIoGenerateCertificate = (): GenerateCertificate => {
  return new IoGenerateCertificate(
    new CertificateConverter(new MomentAdapter())
  )
}
