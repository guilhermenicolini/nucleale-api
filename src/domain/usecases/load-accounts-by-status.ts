import { AccountModel, AccountStatus } from '@/domain/models'

export interface LoadAccountsByStatus {
  loadByStatus: (params: LoadAccountsByStatus.Params) => Promise<LoadAccountsByStatus.Result>
}

export namespace LoadAccountsByStatus {
  export type Params = AccountStatus
  export type Result = Omit<AccountModel, 'password'>[]
}
