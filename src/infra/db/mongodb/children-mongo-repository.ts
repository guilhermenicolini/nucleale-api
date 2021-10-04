import { MongoHelper } from '@/infra/db'
import {
  AddChildrenRepository,
  LoadChildrensRepository,
  UpdateChildrenRepository,
  DeleteChildrenRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class ChildrenMongoRepository implements
  AddChildrenRepository,
  LoadChildrensRepository,
  UpdateChildrenRepository {
  async add (params: AddChildrenRepository.Params): Promise<string> {
    const childrensCollection = await MongoHelper.instance.getCollection('childrens')
    const { accountId, ...obj } = params

    const res = await childrensCollection.insertOne({ accountId: new ObjectId(accountId), ...obj })
    return res.insertedId.toString()
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
      }).sort({ name: 1 }).toArray()
    return MongoHelper.instance.mapCollection(childrens)
  }

  async update (params: UpdateChildrenRepository.Params): Promise<boolean> {
    const childrensCollection = await MongoHelper.instance.getCollection('childrens')
    const operation = await childrensCollection.findOneAndUpdate({
      _id: new ObjectId(params.id),
      accountId: new ObjectId(params.accountId)
    }, {
      $set: {
        name: params.name,
        birth: params.birth,
        gender: params.gender
      }
    })
    return operation.lastErrorObject.updatedExisting
  }

  async delete (params: DeleteChildrenRepository.Params): Promise<boolean> {
    const childrensCollection = await MongoHelper.instance.getCollection('childrens')
    const operation = await childrensCollection.findOneAndDelete({
      _id: new ObjectId(params.id),
      accountId: new ObjectId(params.accountId)
    })
    return operation.lastErrorObject.n === 1
  }
}
