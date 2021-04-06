import { DbLoadInvitation } from '@/data/usecases'
import { LoadInvitation } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbLoadInvitation = (): LoadInvitation => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadInvitation(accountMongoRepository)
}
