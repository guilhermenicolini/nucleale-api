import { CertificateConverter } from '@/infra/converters'
import { ObjectConverter } from '@/data/protocols'
import { MomentAdapter } from '@/infra/manipulation'

export const makeCertificateConverter = (): ObjectConverter<CertificateConverter.Model, CertificateConverter.Result> => {
  return new CertificateConverter(new MomentAdapter())
}
