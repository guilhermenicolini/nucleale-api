import { LinkTypes } from '@/domain/models'

export interface AddLinkRepository {
  add: (data: AddLinkRepository.Params) => Promise<AddLinkRepository.Result>
}

export namespace AddLinkRepository {
  export type Params = {
    type: LinkTypes
    id: string
  }
  export type Result = {
    link: string
    expiration: number
  }
}
