import { DbLoadInvoiceByNumber } from '@/data/usecases'
import { LoadInvoiceByNumber } from '@/domain/usecases'
import { InvoiceMongoRepository } from '@/infra/db'

export const makeDbLoadInvoiceByNumber = (): LoadInvoiceByNumber => {
  const invoiceMongoRepository = new InvoiceMongoRepository()
  return new DbLoadInvoiceByNumber(invoiceMongoRepository)
}
