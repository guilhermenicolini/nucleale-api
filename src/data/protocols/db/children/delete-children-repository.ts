import { DeleteChildren } from '@/domain/usecases'

export interface DeleteChildrenRepository {
  delete: (params: DeleteChildrenRepository.Params) => Promise<boolean>
}

export namespace DeleteChildrenRepository {
  export type Params = DeleteChildren.Params
}
