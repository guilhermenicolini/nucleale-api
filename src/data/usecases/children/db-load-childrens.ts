import { LoadChildrens } from '@/domain/usecases'
import { LoadChildrensRepository } from '@/data/protocols'

export class DbLoadChildrens implements LoadChildrens {
  constructor (
    private readonly loadChildrensRepository: LoadChildrensRepository
  ) { }

  async load (accountId: string): Promise<LoadChildrensRepository.Result> {
    const childrens = await this.loadChildrensRepository.load(accountId)
    return childrens || []
  }
}
