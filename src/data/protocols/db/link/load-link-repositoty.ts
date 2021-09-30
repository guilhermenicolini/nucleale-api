import { LinkModel, LinkTypes } from '@/domain/models'

export interface LoadLinkRepository {
  load: (params: LoadLinkRepository.Params) => Promise<LoadLinkRepository.Result>
}

export namespace LoadLinkRepository {
  export type Params = {
    token: string
    type: LinkTypes
  }
  export type Result = LinkModel
}
