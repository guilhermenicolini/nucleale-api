import { LoadLinkRepository } from '@/data/protocols'
import { LinkTypes } from '@/domain/models'
import { CheckAccountLink } from '@/domain/usecases'

export class DbCheckAccountLink implements CheckAccountLink {
  constructor (
    private readonly type: LinkTypes,
    private readonly loadLinkRepository: LoadLinkRepository
  ) { }

  async check (token: string): Promise<CheckAccountLink.Result> {
    const link = await this.loadLinkRepository.load({ token, type: this.type })
    if (!link) return false
    return link.expiration >= new Date().valueOf()
  }
}
