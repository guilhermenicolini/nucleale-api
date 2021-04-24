import { DbSaveInvoice } from '@/data/usecases'
import { SaveInvoice } from '@/domain/usecases'
import { InvoiceMongoRepository } from '@/infra/db'

export const makeDbSaveInvoice = (): SaveInvoice => {
  const invoiceMongoRepository = new InvoiceMongoRepository()
  return new DbSaveInvoice(invoiceMongoRepository)
}
