import { SaveAddress } from '@/domain/usecases'

export interface SaveAddressRepository {
  save: (data: SaveAddressRepository.Params) => Promise<void>
}

export namespace SaveAddressRepository {
  export type Params = SaveAddress.Params
}
