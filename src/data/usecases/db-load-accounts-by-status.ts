import { LoadAccountsByStatus } from '@/domain/usecases'
import { LoadAccountsByStatusRepository } from '@/data/protocols'

export class DbLoadAccountsByStatus implements LoadAccountsByStatus {
  constructor (
    private readonly loadAccountsByStatusRepository: LoadAccountsByStatusRepository
  ) { }

  async load (params: LoadAccountsByStatus.Params): Promise<LoadAccountsByStatus.Result> {
    const accounts = await this.loadAccountsByStatusRepository.load(params)
    return accounts
  }
}
