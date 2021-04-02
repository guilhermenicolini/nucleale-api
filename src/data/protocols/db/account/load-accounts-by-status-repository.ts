import { LoadAccountsByStatus } from '@/domain/usecases'

export interface LoadAccountsByStatusRepository {
  load: (params: LoadAccountsByStatusRepository.Params) => Promise<LoadAccountsByStatusRepository.Result>
}

export namespace LoadAccountsByStatusRepository {
  export type Params = LoadAccountsByStatus.Params
  export type Result = LoadAccountsByStatus.Result
}
