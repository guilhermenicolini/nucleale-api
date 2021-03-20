import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'
import { BCryptAdapter } from '@/infra/cryptography'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
