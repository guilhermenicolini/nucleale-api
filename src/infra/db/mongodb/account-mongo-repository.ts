import { MongoHelper } from '@/infra/db'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountId = new ObjectId()
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const cmd = await accountCollection.insertOne({ ...data, accountId })
    return {
      userId: cmd.ops[0]._id.toString(),
      accountId: accountId.toString(),
      isValid: cmd.result.ok === 1
    }
  }

  async check (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const user = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return user !== null
  }

  async load (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const user = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        accountId: 1,
        password: 1
      }
    })
    return {
      accountId: user.accountId.toString(),
      userId: user._id.toString(),
      password: user.password
    }
  }
}
