import { DbSaveAccount } from '@/data/usecases'
import { SaveAccount } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbSaveAccount = (): SaveAccount => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbSaveAccount(accountMongoRepository)
}
