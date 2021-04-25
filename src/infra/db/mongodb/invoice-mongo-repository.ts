import { MongoHelper } from '@/infra/db'
import {
  SaveInvoiceRepository
} from '@/data/protocols'

export class InvoiceMongoRepository implements
  SaveInvoiceRepository {
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
}
