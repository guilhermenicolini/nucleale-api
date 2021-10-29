import { DbLoadCertificateByHash } from '@/data/usecases'
import { LoadCertificateByHash } from '@/domain/usecases'
import { CertificatetMongoRepository } from '@/infra/db'

export const makeDbLoadCertificateByHash = (): LoadCertificateByHash => {
  return new DbLoadCertificateByHash(new CertificatetMongoRepository())
}
