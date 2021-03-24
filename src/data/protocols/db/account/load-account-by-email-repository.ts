import { VerifyAccount } from '@/domain/usecases'

export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
  export type Result = VerifyAccount.Result
}
