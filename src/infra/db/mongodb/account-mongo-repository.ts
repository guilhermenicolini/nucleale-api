import { MongoHelper } from '@/infra/db'
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountsByStatusRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository, LoadAccountsByStatusRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const { accountId, ...obj } = data
    const cmd = await accountCollection.insertOne({ ...obj, accountId: new ObjectId(accountId) })
    return {
      userId: cmd.ops[0]._id.toString(),
      accountId,
      isValid: cmd.result.ok === 1
    }
  }

  async check (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }

  async load (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        accountId: 1,
        password: 1
      }
    })
    if (account) {
      return {
        accountId: account.accountId.toString(),
        userId: account._id.toString(),
        password: account.password
      }
    }
    return null
  }

  async loadByStatus (params: LoadAccountsByStatusRepository.Params): Promise<LoadAccountsByStatusRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const accounts = accountCollection.find({
      status: params
    }).toArray()
    return accounts
  }
}
