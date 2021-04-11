import { SaveAccount } from '@/domain/usecases'
import { SaveAccountRepository } from '@/data/protocols'

export class DbSaveAccount implements SaveAccount {
  constructor (
    private readonly saveAccountRepository: SaveAccountRepository
  ) { }

  async save (userId: string, data: SaveAccount.Params): Promise<void> {
    await this.saveAccountRepository.save(userId, data)
  }
}
