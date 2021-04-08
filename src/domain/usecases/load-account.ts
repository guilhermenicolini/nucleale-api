import { AccountModel } from '@/domain/models'

export interface LoadAccount {
  load: (userId: string) => Promise<LoadAccount.Result>
}

export namespace LoadAccount {
  export type Result = Omit<AccountModel, 'password'>
}
