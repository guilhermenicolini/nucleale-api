import { DbLoadProcedures } from '@/data/usecases'
import { LoadProcedures } from '@/domain/usecases'
import { CompanyMongoRepository } from '@/infra/db'

export const makeDbLoadProcedures = (): LoadProcedures => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new DbLoadProcedures(companyMongoRepository)
}
