import { DbLoadCertificates } from '@/data/usecases'
import { LoadCertificates } from '@/domain/usecases'
import { CertificatetMongoRepository } from '@/infra/db'

export const makeDbLoadCertificates = (): LoadCertificates => {
  return new DbLoadCertificates(new CertificatetMongoRepository())
}
