import { MongoHelper } from '@/infra/db'
import { AddAccountRepository } from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountId = new ObjectId()
    const userCollection = await MongoHelper.instance.getCollection('users')
    const cmd = await userCollection.insertOne({ ...data, accountId })
    return {
      userId: cmd.ops[0]._id.toString(),
      accountId: accountId.toString(),
      isValid: cmd.result.ok === 1
    }
  }
}
