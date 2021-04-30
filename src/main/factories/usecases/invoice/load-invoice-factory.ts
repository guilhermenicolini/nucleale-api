import { DbLoadInvoice } from '@/data/usecases'
import { LoadInvoice } from '@/domain/usecases'
import { InvoiceMongoRepository } from '@/infra/db'

export const makeDbLoadInvoice = (): LoadInvoice => {
  const invoiceMongoRepository = new InvoiceMongoRepository()
  return new DbLoadInvoice(invoiceMongoRepository)
}
