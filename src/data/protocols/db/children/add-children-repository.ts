import { AddChildren } from '@/domain/usecases'

export interface AddChildrenRepository {
  add: (params: AddChildrenRepository.Params) => Promise<string>
}

export namespace AddChildrenRepository {
  export type Params = AddChildren.Params
}
