import { AccountModel, AddressModel } from '@/domain/models'

export interface SearchAccounts {
  search: (term: string) => Promise<SearchAccounts.Result>
}

export namespace SearchAccounts {
  export type Result = {
    accounts: AccountModel[]
    address: AddressModel
  }[]
}
