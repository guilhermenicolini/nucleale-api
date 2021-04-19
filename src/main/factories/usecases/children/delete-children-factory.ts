import { DbDeleteChildren } from '@/data/usecases'
import { DeleteChildren } from '@/domain/usecases'
import { ChildrenMongoRepository } from '@/infra/db'

export const makeDbDeleteChildren = (): DeleteChildren => {
  const childrenMongoRepository = new ChildrenMongoRepository()
  return new DbDeleteChildren(childrenMongoRepository)
}
