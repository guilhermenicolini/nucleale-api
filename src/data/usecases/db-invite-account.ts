import { InviteAccount } from '@/domain/usecases'
import { InviteAccountRepository } from '@/data/protocols'

export class DbInviteAccount implements InviteAccount {
  constructor (
    private readonly inviteAccountRepository: InviteAccountRepository
  ) { }

  async invite (accountId: string, email: string): Promise<boolean> {
    const result = await this.inviteAccountRepository.inviteAccount(accountId, email)
    return result
  }
}
