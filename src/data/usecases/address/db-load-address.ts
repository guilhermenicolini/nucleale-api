import { LoadAddress } from '@/domain/usecases'
import { LoadAddressRepository } from '@/data/protocols'

export class DbLoadAddress implements LoadAddress {
  constructor (
    private readonly loadAddressRepository: LoadAddressRepository
  ) { }

  async load (accountId: string): Promise<LoadAddress.Result> {
    const address = await this.loadAddressRepository.load(accountId)
    return address
  }
}
