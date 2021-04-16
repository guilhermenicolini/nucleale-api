import {
  SaveAddressRepository,
  LoadAddressRepository
} from '@/data/protocols'
import { SaveAddress, LoadAddress } from '@/domain/usecases'
import { mockAddressModel } from '@/tests/domain/mocks'

export class SaveAddressRepositorySpy implements SaveAddressRepository {
  params: SaveAddress.Params

  async save (params: SaveAddress.Params): Promise<void> {
    this.params = params
  }
}

export class LoadAddressRepositorySpy implements LoadAddressRepository {
  accountId: string
  result: LoadAddress.Result = mockAddressModel()

  async load (accountId: string): Promise<LoadAddress.Result> {
    this.accountId = accountId
    return this.result
  }
}
