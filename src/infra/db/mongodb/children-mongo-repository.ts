import { MongoHelper } from '@/infra/db'
import {
  AddChildrenRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class ChildrenMongoRepository implements
  AddChildrenRepository {
  async add (params: AddChildrenRepository.Params): Promise<string> {
    const childrensCollection = await MongoHelper.instance.getCollection('childrens')
    const { accountId, ...obj } = params

    const res = await childrensCollection.insertOne({ ...obj, accountId: new ObjectId(accountId) })
    return res.ops[0]._id.toString()
  }
}
