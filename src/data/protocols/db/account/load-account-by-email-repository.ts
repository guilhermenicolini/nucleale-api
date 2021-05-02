import { AccountModel } from '@/domain/models'

export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
  export type Result = AccountModel
}
