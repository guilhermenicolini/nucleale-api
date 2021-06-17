import { LoadInvoice } from '@/domain/usecases'
import { LoadInvoiceRepository } from '@/data/protocols'

export class DbLoadInvoice implements LoadInvoice {
  constructor (
    private readonly loadInvoiceRepository: LoadInvoiceRepository
  ) { }

  async load (invoiceNo: number, accountId: string): Promise<LoadInvoiceRepository.Result> {
    const invoice = this.loadInvoiceRepository.loadOne(invoiceNo, accountId)
    return invoice
  }
}
