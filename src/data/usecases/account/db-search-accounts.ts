import { SearchAccounts } from '@/domain/usecases'
import { SearchAccountsRepository } from '@/data/protocols'

export class DbSearchAccounts implements SearchAccounts {
  constructor (
    private readonly searchAccountsRepository: SearchAccountsRepository
  ) { }

  async search (term: string): Promise<SearchAccountsRepository.Result> {
    const accounts = await this.searchAccountsRepository.search(term)
    return accounts || []
  }
}
