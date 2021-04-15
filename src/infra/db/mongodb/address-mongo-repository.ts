import { MongoHelper } from '@/infra/db'
import {
  SaveAddressRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'
import { SaveAddress } from '@/domain/usecases'

export class AddressMongoRepository implements
  SaveAddressRepository {
  async save (data: SaveAddress.Params): Promise<void> {
    const addressesCollection = await MongoHelper.instance.getCollection('addresses')
    const { accountId, ...obj } = data

    await addressesCollection.replaceOne({ accountId: new ObjectId(accountId) }, {
      accountId: new ObjectId(accountId),
      ...obj
    }, { upsert: true })
  }
}
