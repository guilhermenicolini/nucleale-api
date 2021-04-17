import { LoadAddress } from '@/domain/usecases'

export interface LoadAddressRepository {
  load: (accountId: string) => Promise<LoadAddressRepository.Result>
}

export namespace LoadAddressRepository {
  export type Result = LoadAddress.Result
}
