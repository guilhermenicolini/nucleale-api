import { ChildrenModel } from '@/domain/models'

export interface LoadChildrens {
  load: (accountId: string) => Promise<LoadChildrens.Result>
}

export namespace LoadChildrens {
  export type Result = Omit<ChildrenModel, 'accountId'>[]
}
