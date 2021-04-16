import { AddressModel } from '@/domain/models'

export interface LoadAddress {
  load: (accountId: string) => Promise<LoadAddress.Result>
}

export namespace LoadAddress {
  export type Result = Omit<AddressModel, 'id | accountId'>
}
