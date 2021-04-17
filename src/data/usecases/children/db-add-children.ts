import { AddChildren } from '@/domain/usecases'
import { AddChildrenRepository } from '@/data/protocols'

export class DbAddChildren implements AddChildren {
  constructor (
    private readonly addChildrenRepository: AddChildrenRepository
  ) { }

  async add (params: AddChildrenRepository.Params): Promise<string> {
    const id = await this.addChildrenRepository.add(params)
    return id
  }
}
