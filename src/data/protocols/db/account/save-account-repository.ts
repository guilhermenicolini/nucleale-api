import { SaveAccount } from '@/domain/usecases'

export interface SaveAccountRepository {
  save: (userId: string, data: SaveAccountRepository.Params) => Promise<void>
}

export namespace SaveAccountRepository {
  export type Params = SaveAccount.Params
}
