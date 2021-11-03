import { AddressModel } from '@/domain/models'

export interface LoadAddressByZip {
  load: (zip: string) => Promise<LoadAddressByZip.Result>
}

export namespace LoadAddressByZip {
  export type Result = Pick<AddressModel, 'address' | 'district' | 'city' | 'state'>
}
