import { MongoHelper } from '@/infra/db'
import {
  SaveInvoiceRepository,
  LoadInvoicesRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class InvoiceMongoRepository implements
  SaveInvoiceRepository,
  LoadInvoicesRepository {
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
}
