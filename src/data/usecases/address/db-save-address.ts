import { SaveAddress } from '@/domain/usecases'
import { SaveAddressRepository } from '@/data/protocols'

export class DbSaveAddress implements SaveAddress {
  constructor (
    private readonly saveAddressRepository: SaveAddressRepository
  ) { }

  async save (data: SaveAddress.Params): Promise<void> {
    await this.saveAddressRepository.save(data)
  }
}
