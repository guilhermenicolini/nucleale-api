import { MongoHelper } from '@/infra/db'
import {
  SaveAddressRepository,
  LoadAddressRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'
import { SaveAddress } from '@/domain/usecases'

export class AddressMongoRepository implements
  SaveAddressRepository,
  LoadAddressRepository {
  async save (data: SaveAddress.Params): Promise<void> {
    const addressesCollection = await MongoHelper.instance.getCollection('addresses')
    const { accountId, ...obj } = data

    await addressesCollection.replaceOne({ accountId: new ObjectId(accountId) }, {
      accountId: new ObjectId(accountId),
      ...obj
    }, { upsert: true })
  }

  async load (accountId: string): Promise<LoadAddressRepository.Result> {
    const addressesCollection = await MongoHelper.instance.getCollection('addresses')
    const address = await addressesCollection.findOne<LoadAddressRepository.Result>({
      accountId: new ObjectId(accountId)
    }, {
      projection: {
        _id: 0,
        accountId: 0
      }
    })
    return address
  }
}
