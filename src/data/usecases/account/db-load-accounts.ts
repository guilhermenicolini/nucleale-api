import { LoadAccounts } from '@/domain/usecases'
import { LoadAccountsRepository } from '@/data/protocols'

export class DbLoadAccounts implements LoadAccounts {
  constructor (
    private readonly loadAccountsRepository: LoadAccountsRepository
  ) { }

  async loadAll (accountId: string, userId: string): Promise<LoadAccountsRepository.Result> {
    const accounts = await this.loadAccountsRepository.loadAll(accountId, userId)
    return accounts || []
  }
}
