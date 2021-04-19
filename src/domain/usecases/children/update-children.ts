import { ChildrenModel } from '@/domain/models'

export interface UpdateChildren {
  update: (params: UpdateChildren.Params) => Promise<boolean>
}

export namespace UpdateChildren {
  export type Params = ChildrenModel
}
