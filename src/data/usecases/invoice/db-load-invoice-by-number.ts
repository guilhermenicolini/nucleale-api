import { LoadInvoiceByNumber } from '@/domain/usecases'
import { LoadInvoiceByNumberRepository } from '@/data/protocols'

export class DbLoadInvoiceByNumber implements LoadInvoiceByNumber {
  constructor (
    private readonly loadInvoiceByNumberRepository: LoadInvoiceByNumberRepository
  ) { }

  async loadByNumber (invoiceNo: number): Promise<LoadInvoiceByNumberRepository.Result> {
    const invoice = this.loadInvoiceByNumberRepository.loadByNumber(invoiceNo)
    return invoice
  }
}
