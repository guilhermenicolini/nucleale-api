import { MongoHelper, accountMapper } from '@/infra/db'
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountsByStatusRepository,
  LoadInvitationRepository,
  LoadAccountRepository,
  SaveAccountRepository,
  InviteAccountRepository,
  LoadAccountsRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'
import { SaveAccount } from '@/domain/usecases'

export class AccountMongoRepository implements
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountsByStatusRepository,
  LoadInvitationRepository,
  SaveAccountRepository,
  InviteAccountRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const invitationCollection = await MongoHelper.instance.getCollection('invitations')
    const { accountId, ...obj } = data
    const cmd = await accountCollection.insertOne({ accountId: new ObjectId(accountId), ...obj })
    await invitationCollection.findOneAndDelete({ email: data.email })
    return {
      userId: cmd.ops[0]._id.toString(),
      accountId: cmd.ops[0].accountId.toString(),
      role: cmd.ops[0].role,
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
    })

    return account ? MongoHelper.instance.map(account, accountMapper()) : null
  }

  async loadByStatus (params: LoadAccountsByStatusRepository.Params): Promise<LoadAccountsByStatusRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const accounts = await accountCollection.find({
      status: params
    }, {
      projection: {
        password: 0
      }
    }).toArray()

    return MongoHelper.instance.mapCollection(accounts, accountMapper())
  }

  async loadInvitation (email: string): Promise<string> {
    const invitationCollection = await MongoHelper.instance.getCollection('invitations')
    const invite = await invitationCollection.findOne({ email })
    if (invite) {
      return invite.accountId.toString()
    }
    return null
  }

  async loadById (userId: string): Promise<LoadAccountRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const account = await accountCollection.findOne({
      _id: new ObjectId(userId)
    }, {
      projection: {
        password: 0
      }
    })

    return account ? MongoHelper.instance.map(account, accountMapper()) : null
  }

  async save (userId: string, data: SaveAccount.Params): Promise<void> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    await accountCollection.findOneAndUpdate({
      _id: new ObjectId(userId)
    }, { $set: data })
  }

  async inviteAccount (accountId: string, email: string): Promise<boolean> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    if (account) {
      return false
    }

    const invitationCollection = await MongoHelper.instance.getCollection('invitations')
    await invitationCollection.replaceOne({ email }, {
      email,
      accountId: new ObjectId(accountId)
    }, { upsert: true })
    return true
  }

  async loadAll (accountId: string, userId: string): Promise<LoadAccountsRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const accounts = await accountCollection.find({
      accountId: new ObjectId(accountId),
      _id: { $ne: new ObjectId(userId) }
    }, {
      projection: {
        password: 0
      }
    }).sort({ name: 1 }).toArray()

    return MongoHelper.instance.mapCollection(accounts, accountMapper())
  }
}
