import { DbLoadAccountsByStatus } from '@/data/usecases'
import { LoadAccountsByStatus } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbLoadAccountsByStatus = (): LoadAccountsByStatus => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountsByStatus(accountMongoRepository)
}
