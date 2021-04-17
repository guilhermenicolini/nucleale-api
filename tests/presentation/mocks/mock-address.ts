import {
  SaveAddress,
  LoadAddress
} from '@/domain/usecases'
import { mockAddressModel } from '@/tests/domain/mocks'

export class SaveAddressSpy implements SaveAddress {
  params: SaveAddress.Params

  async save (params: SaveAddress.Params): Promise<void> {
    this.params = params
  }
}

export class LoadAddressSpy implements LoadAddress {
  accountId: string
  result: LoadAddress.Result = mockAddressModel()

  async load (accountId: string): Promise<LoadAddress.Result> {
    this.accountId = accountId
    return this.result
  }
}
