import {
  SaveAddress,
  LoadAddress,
  LoadAddressByZip
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

export class LoadAddressByZipSpy implements LoadAddressByZip {
  zip: string
  result: LoadAddressByZip.Result = mockAddressModel()

  async load (zip: string): Promise<LoadAddressByZip.Result> {
    this.zip = zip
    return this.result
  }
}
