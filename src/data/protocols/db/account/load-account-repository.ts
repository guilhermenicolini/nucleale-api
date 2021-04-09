import { LoadAccount } from '@/domain/usecases'

export interface LoadAccountRepository {
  loadById: (userId: string) => Promise<LoadAccountRepository.Result>
}

export namespace LoadAccountRepository {
  export type Result = LoadAccount.Result
}
