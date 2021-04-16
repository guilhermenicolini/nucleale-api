import { LoadAddress } from '@/domain/usecases'

export interface LoadAddressRepository {
  load: (accountId: string) => Promise<LoadAddress.Result>
}
