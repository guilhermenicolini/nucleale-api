import { UpdateChildren } from '@/domain/usecases'

export interface UpdateChildrenRepository {
  update: (params: UpdateChildrenRepository.Params) => Promise<boolean>
}

export namespace UpdateChildrenRepository {
  export type Params = UpdateChildren.Params
}
