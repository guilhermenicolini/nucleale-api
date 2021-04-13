import { DbInviteAccount } from '@/data/usecases'
import { InviteAccount } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbInviteAccount = (): InviteAccount => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbInviteAccount(accountMongoRepository)
}
