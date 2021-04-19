import { LoadChildrens } from '@/domain/usecases'

export interface LoadChildrensRepository {
  load: (accountId: string) => Promise<LoadChildrensRepository.Result>
}

export namespace LoadChildrensRepository {
  export type Result = LoadChildrens.Result
}
