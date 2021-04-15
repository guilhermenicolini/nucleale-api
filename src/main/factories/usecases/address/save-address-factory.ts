import { DbSaveAddress } from '@/data/usecases'
import { SaveAddress } from '@/domain/usecases'
import { AddressMongoRepository } from '@/infra/db'

export const makeDbSaveAddress = (): SaveAddress => {
  const addressMongoRepository = new AddressMongoRepository()
  return new DbSaveAddress(addressMongoRepository)
}
