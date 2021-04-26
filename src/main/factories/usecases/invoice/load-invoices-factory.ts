import { DbLoadInvoices } from '@/data/usecases'
import { LoadInvoices } from '@/domain/usecases'
import { InvoiceMongoRepository } from '@/infra/db'

export const makeDbLoadInvoices = (): LoadInvoices => {
  const invoiceMongoRepository = new InvoiceMongoRepository()
  return new DbLoadInvoices(invoiceMongoRepository)
}
