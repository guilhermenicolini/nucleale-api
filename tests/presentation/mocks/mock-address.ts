import {
  SaveAddress
} from '@/domain/usecases'

export class SaveAddressSpy implements SaveAddress {
  params: SaveAddress.Params

  async save (params: SaveAddress.Params): Promise<void> {
    this.params = params
  }
}
