import { DbAddChildren } from '@/data/usecases'
import { AddChildren } from '@/domain/usecases'
import { ChildrenMongoRepository } from '@/infra/db'

export const makeDbAddChildren = (): AddChildren => {
  const childrenMongoRepository = new ChildrenMongoRepository()
  return new DbAddChildren(childrenMongoRepository)
}
