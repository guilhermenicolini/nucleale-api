import { SearchAccounts } from '@/domain/usecases'

export interface SearchAccountsRepository {
  search: (term: string) => Promise<SearchAccountsRepository.Result>
}

export namespace SearchAccountsRepository {
  export type Result = SearchAccounts.Result
}
