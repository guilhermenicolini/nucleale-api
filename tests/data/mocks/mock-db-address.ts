import {
  SaveAddressRepository
} from '@/data/protocols'
import { SaveAddress } from '@/domain/usecases'

export class SaveAddressRepositorySpy implements SaveAddressRepository {
  params: SaveAddress.Params

  async save (params: SaveAddress.Params): Promise<void> {
    this.params = params
  }
}
