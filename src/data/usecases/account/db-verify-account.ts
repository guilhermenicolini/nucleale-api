import { VerifyAccount } from '@/domain/usecases'
import { HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbVerifyAccount implements VerifyAccount {
  constructor (
    private readonly hasheComparer: HashComparer,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async verify (params: VerifyAccount.Params): Promise<VerifyAccount.Result> {
    const account = await this.loadAccountByEmailRepository.load(params.email)
    if (account) {
      const isValid = await this.hasheComparer.compare(params.password, account.password)
      if (isValid) {
        return {
          accountId: account.accountId,
          userId: account.id,
          role: account.role
        }
      }
    }
    return null
  }
}
