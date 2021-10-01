import { DbChangePassword } from '@/data/usecases'
import { ChangePassword } from '@/domain/usecases'
import { LinkMongoRepository, AccountMongoRepository } from '@/infra/db'
import { BCryptAdapter } from '@/infra/cryptography'

export const makeDbChangePassword = (): ChangePassword => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const linkMongoRepository = new LinkMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  return new DbChangePassword(bcryptAdapter, linkMongoRepository, accountMongoRepository)
}
