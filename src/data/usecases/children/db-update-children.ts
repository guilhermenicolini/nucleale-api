import { UpdateChildren } from '@/domain/usecases'
import { UpdateChildrenRepository } from '@/data/protocols'

export class DbUpdateChildren implements UpdateChildren {
  constructor (
    private readonly updateChildrenRepository: UpdateChildrenRepository
  ) { }

  async update (params: UpdateChildrenRepository.Params): Promise<boolean> {
    const result = await this.updateChildrenRepository.update(params)
    return result
  }
}
