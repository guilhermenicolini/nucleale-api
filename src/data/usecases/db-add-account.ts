import { AddAccount } from '@/domain/usecases'
import { Hasher, AddAccountRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) { }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const hashedPassword = await this.hasher.hash(params.password)
    await this.addAccountRepository.add({ email: params.email, password: hashedPassword })
    return null
  }
}
