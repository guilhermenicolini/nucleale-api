import { DbLoadAddress } from '@/data/usecases'
import { LoadAddress } from '@/domain/usecases'
import { AddressMongoRepository } from '@/infra/db'

export const makeDbLoadAddress = (): LoadAddress => {
  const addressMongoRepository = new AddressMongoRepository()
  return new DbLoadAddress(addressMongoRepository)
}
