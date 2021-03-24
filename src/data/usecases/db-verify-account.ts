import { VerifyAccount } from '@/domain/usecases'
import { HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbVerifyAccount implements VerifyAccount {
  constructor (
    private readonly hasheComparer: HashComparer,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async verify (params: VerifyAccount.Params): Promise<VerifyAccount.Result> {
    await this.loadAccountByEmailRepository.load(params.email)
    return null
  }
}
