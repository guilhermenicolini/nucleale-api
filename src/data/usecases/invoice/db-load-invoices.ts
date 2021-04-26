import { LoadInvoices } from '@/domain/usecases'
import { LoadInvoicesRepository } from '@/data/protocols'

export class DbLoadInvoices implements LoadInvoices {
  constructor (
    private readonly loadInvoicesRepository: LoadInvoicesRepository
  ) { }

  async load (accountId: string): Promise<LoadInvoicesRepository.Result> {
    const invoices = await this.loadInvoicesRepository.load(accountId)
    return invoices || []
  }
}
