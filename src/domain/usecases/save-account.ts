import { AccountModel } from '@/domain/models'

export interface SaveAccount {
  save: (id: string, data: SaveAccount.Params) => Promise<void>
}

export namespace SaveAccount {
  export type Params = Partial<Omit<AccountModel, 'id'>>
}
