import { MongoHelper, accountMapper, subAccountMapper } from '@/infra/db'
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountsByStatusRepository,
  LoadInvitationRepository,
  LoadAccountRepository,
  SaveAccountRepository,
  InviteAccountRepository,
  LoadAccountsRepository,
  SearchAccountsRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'
import { SaveAccount } from '@/domain/usecases'

export class AccountMongoRepository implements
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountsByStatusRepository,
  LoadInvitationRepository,
  SaveAccountRepository,
  InviteAccountRepository,
  SearchAccountsRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.instance.getCollection('accounts')
    const invitationCollection = await MongoHelper.instance.getCollection('invitations')
    const { accountId, ...obj } = data
    const accId = new ObjectId(accountId)
    const cmd = await accountCollection.insertOne({ accountId: accId, ...obj })
    await invitationCollection.findOneAndDelete({ email: data.email })
    return {
      userId: cmd.insertedId.toString(),
      accountId: accId.toString(),
      role: data.role,
      isValid: true
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

  async search (term: string = ''): Promise<SearchAccountsRepository.Result> {
    const terms = term
      ? [
          { 'accounts.name': { $regex: term, $options: 'i' } },
          { 'accounts.taxId': { $regex: term, $options: 'i' } },
          { 'accounts.email': { $regex: term, $options: 'i' } },
          { 'accounts.mobilePhone': { $regex: term, $options: 'i' } },
          { 'childrens.name': { $regex: term, $options: 'i' } }
        ]
      : [{ 'accounts._id': { $ne: null } }]

    const accountsCollection = await MongoHelper.instance.getCollection('accounts')
    const accounts = await accountsCollection
      .aggregate([
        {
          $group: {
            _id: '$accountId',
            users: { $push: '$_id' }
          }
        },
        {
          $lookup: {
            from: 'accounts',
            localField: '_id',
            foreignField: 'accountId',
            as: 'accounts'
          }
        },
        {
          $lookup: {
            from: 'addresses',
            localField: '_id',
            foreignField: 'accountId',
            as: 'addresses'
          }
        },
        {
          $lookup: {
            from: 'childrens',
            localField: '_id',
            foreignField: 'accountId',
            as: 'childrens'
          }
        },
        {
          $project: {
            accounts: 1,
            address: { $arrayElemAt: ['$addresses', 0] },
            childrens: 1
          }
        },
        {
          $match: {
            $or: terms
          }
        }
      ]).toArray()
    return MongoHelper.instance.mapCollection(accounts, subAccountMapper())
  }
}
