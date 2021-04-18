import { ChildrenModel } from '@/domain/models'

export interface AddChildren {
  add: (params: AddChildren.Params) => Promise<string>
}

export namespace AddChildren {
  export type Params = Omit<ChildrenModel, 'id'>
}
