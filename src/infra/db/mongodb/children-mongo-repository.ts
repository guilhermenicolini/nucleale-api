import { MongoHelper } from '@/infra/db'
import {
  AddChildrenRepository,
  LoadChildrensRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class ChildrenMongoRepository implements
  AddChildrenRepository,
  LoadChildrensRepository {
  async add (params: AddChildrenRepository.Params): Promise<string> {
    const childrensCollection = await MongoHelper.instance.getCollection('childrens')
    const { accountId, ...obj } = params

    const res = await childrensCollection.insertOne({ accountId: new ObjectId(accountId), ...obj })
    return res.ops[0]._id.toString()
  }

  async load (accountId: string): Promise<LoadChildrensRepository.Result> {
    const childrensCollection = await MongoHelper.instance.getCollection('childrens')
    const childrens = await childrensCollection
      .find({
        accountId: new ObjectId(accountId)
      }, {
        projection: {
          accountId: 0
        }
      }).toArray()
    return MongoHelper.instance.mapCollection(childrens)
  }
}
