import { DbLoadAccountByEmail } from '@/data/usecases'
import { LoadAccountByEmail } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbLoadAccountByEmail = (): LoadAccountByEmail => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByEmail(accountMongoRepository)
}
