import { CheckAccountLink } from '@/domain/usecases'
import { DbCheckAccountLink } from '@/data/usecases'
import { LinkTypes } from '@/domain/models'
import { LinkMongoRepository } from '@/infra/db'

export const makeDbCheckAccountLink = (): CheckAccountLink => {
  return new DbCheckAccountLink(LinkTypes.passwordRecovery, new LinkMongoRepository())
}
