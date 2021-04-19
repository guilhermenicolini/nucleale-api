import { DbUpdateChildren } from '@/data/usecases'
import { UpdateChildren } from '@/domain/usecases'
import { ChildrenMongoRepository } from '@/infra/db'

export const makeDbUpdateChildren = (): UpdateChildren => {
  const childrenMongoRepository = new ChildrenMongoRepository()
  return new DbUpdateChildren(childrenMongoRepository)
}
