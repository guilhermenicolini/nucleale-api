import { AccountModel } from '@/domain/models'

export interface LoadAccountByEmail {
  load: (email: string) => Promise<LoadAccountByEmail.Result>
}

export namespace LoadAccountByEmail {
  export type Result = AccountModel
}
