import { MongoHelper } from '@/infra/db'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository {
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

  async check (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const userCollection = await MongoHelper.instance.getCollection('users')
    const user = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return user !== null
  }
}
