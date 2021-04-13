import { AccountModel } from '@/domain/models'

export interface SaveAccount {
  save: (userId: string, data: SaveAccount.Params) => Promise<void>
}

export namespace SaveAccount {
  export type Params = Partial<Omit<AccountModel, 'id'>>
}
