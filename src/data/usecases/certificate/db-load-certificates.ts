import { LoadCertificates } from '@/domain/usecases'
import { LoadCertificatesRepository } from '@/data/protocols'

export class DbLoadCertificates implements LoadCertificates {
  constructor (
    private readonly loadCertificatesRepository: LoadCertificatesRepository
  ) { }

  async load (accountId: string): Promise<LoadCertificatesRepository.Result> {
    const invoices = await this.loadCertificatesRepository.load(accountId)
    return invoices || []
  }
}
