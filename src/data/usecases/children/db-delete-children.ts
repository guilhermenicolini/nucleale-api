import { DeleteChildren } from '@/domain/usecases'
import { DeleteChildrenRepository } from '@/data/protocols'

export class DbDeleteChildren implements DeleteChildren {
  constructor (
    private readonly deleteChildrenRepository: DeleteChildrenRepository
  ) { }

  async delete (params: DeleteChildrenRepository.Params): Promise<boolean> {
    const result = await this.deleteChildrenRepository.delete(params)
    return result
  }
}
