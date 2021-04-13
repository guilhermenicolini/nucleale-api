import { DbVerifyAccount } from '@/data/usecases'
import { VerifyAccount } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'
import { BCryptAdapter } from '@/infra/cryptography'

export const makeDbVerifyAccount = (): VerifyAccount => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbVerifyAccount(bcryptAdapter, accountMongoRepository)
}
