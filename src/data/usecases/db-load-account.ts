import { LoadAccount } from '@/domain/usecases'
import { LoadAccountRepository } from '@/data/protocols'

export class DbLoadAccount implements LoadAccount {
  constructor (
    private readonly loadAccountRepository: LoadAccountRepository
  ) { }

  async load (userId: string): Promise<LoadAccount.Result> {
    const account = await this.loadAccountRepository.loadById(userId)
    return account
  }
}
