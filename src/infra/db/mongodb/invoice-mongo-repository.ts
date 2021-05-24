import { MongoHelper } from '@/infra/db'
import {
  SaveInvoiceRepository,
  LoadInvoicesRepository,
  LoadInvoiceRepository,
  LoadNextRpsRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class InvoiceMongoRepository implements
  SaveInvoiceRepository,
  LoadInvoicesRepository,
  LoadInvoiceRepository,
  LoadNextRpsRepository {
  async save (data: SaveInvoiceRepository.Param): Promise<void> {
    const invoicesCollection = await MongoHelper.instance.getCollection('invoices')

    const exists = await invoicesCollection.findOne({ invoiceNo: data.invoiceNo }, {
      projection: {
        _id: 1
      }
    })
    if (exists) {
      return null
    }
    await invoicesCollection.insertOne(data)
  }

  async load (accountId: string): Promise<LoadInvoicesRepository.Result> {
    const accountsCollection = await MongoHelper.instance.getCollection('accounts')
    const invoices = await accountsCollection
      .aggregate([
        {
          $match: {
            accountId: new ObjectId(accountId),
            status: 'active'
          }
        },
        {
          $lookup: {
            from: 'invoices',
            localField: 'taxId',
            foreignField: 'taker.taxId',
            as: 'invoice'
          }
        },
        {
          $match: {
            'invoice.status': 'Normal'
          }
        },
        {
          $unwind: {
            path: '$invoice'
          }
        },
        {
          $replaceRoot: {
            newRoot: '$invoice'
          }
        },
        {
          $sort: {
            invoiceDate: -1
          }
        },
        {
          $project: {
            _id: 1,
            invoiceNo: 1,
            invoiceDate: 1,
            description: 1
          }
        }
      ]).toArray()
    return MongoHelper.instance.mapCollection(invoices)
  }

  async loadOne (id: string, accountId: string): Promise<LoadInvoiceRepository.Result> {
    const invoicesCollection = await MongoHelper.instance.getCollection('invoices')
    const invoice = await invoicesCollection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            status: 'Normal'
          }
        },
        {
          $lookup: {
            from: 'accounts',
            localField: 'taker.taxId',
            foreignField: 'taxId',
            as: 'account'
          }
        },
        {
          $unwind: {
            path: '$account'
          }
        },
        {
          $match: {
            'account.accountId': new ObjectId(accountId),
            'account.status': 'active'
          }
        },
        {
          $project: {
            account: 0
          }
        }
      ]).toArray()
    return invoice.length === 1 ? MongoHelper.instance.map(invoice[0]) : null
  }

  async next (): Promise<number> {
    const invoicesCollection = await MongoHelper.instance.getCollection('invoices')
    const result = await invoicesCollection
      .aggregate([
        {
          $project: {
            _id: 0,
            rpsNumber: 1
          }
        },
        {
          $sort: { rpsNumber: -1 }
        },
        {
          $limit: 1
        }
      ]).toArray()
    return result.length === 1 ? (result[0].rpsNumber || -1) + 1 : 0
  }
}
