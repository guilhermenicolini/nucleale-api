import { DbCreateCertificate } from '@/data/usecases'
import { CreateCertificate } from '@/domain/usecases'
import { AccountMongoRepository, CompanyMongoRepository, CertificatetMongoRepository } from '@/infra/db'

export const makeDbCreateCertificate = (): CreateCertificate => {
  return new DbCreateCertificate(
    new AccountMongoRepository(),
    new CompanyMongoRepository(),
    new CertificatetMongoRepository()
  )
}
