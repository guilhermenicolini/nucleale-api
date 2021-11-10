import { DbSearchAccounts } from '@/data/usecases'
import { SearchAccounts } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbSearchAccounts = (): SearchAccounts => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbSearchAccounts(accountMongoRepository)
}
