import { DbLoadAccounts } from '@/data/usecases'
import { LoadAccounts } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbLoadAccounts = (): LoadAccounts => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccounts(accountMongoRepository)
}
