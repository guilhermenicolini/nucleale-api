import { DbLoadChildrens } from '@/data/usecases'
import { LoadChildrens } from '@/domain/usecases'
import { ChildrenMongoRepository } from '@/infra/db'

export const makeDbLoadChildrens = (): LoadChildrens => {
  const childrenMongoRepository = new ChildrenMongoRepository()
  return new DbLoadChildrens(childrenMongoRepository)
}
