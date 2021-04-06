import { LoadInvitation } from '@/domain/usecases'
import { LoadInvitationRepository } from '@/data/protocols'

export class DbLoadInvitation implements LoadInvitation {
  constructor (
    private readonly loadInvitationRepository: LoadInvitationRepository
  ) { }

  async load (email: string): Promise<string> {
    const accountId = await this.loadInvitationRepository.loadInvitation(email)
    return accountId
  }
}
