import { AccountModel } from '@/domain/models'

export interface LoadAccounts {
  loadAll: (accountId: string, userId: string) => Promise<LoadAccounts.Result>
}

export namespace LoadAccounts {
  export type Result = Omit<AccountModel, 'password'>[]
}
