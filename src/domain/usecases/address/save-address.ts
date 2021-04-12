import { AddressModel } from '@/domain/models'

export interface SaveAddress {
  save: (data: SaveAddress.Params) => Promise<void>
}

export namespace SaveAddress {
  export type Params = AddressModel
}
