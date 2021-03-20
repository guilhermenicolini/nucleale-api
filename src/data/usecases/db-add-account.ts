import { AddAccount } from '@/domain/usecases'
import { Hasher, AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.check(params.email)
    if (exists) {
      return {
        isValid: false,
        accountId: null,
        userId: null
      }
    }
    const hashedPassword = await this.hasher.hash(params.password)
    const account = await this.addAccountRepository.add({ email: params.email, password: hashedPassword })
    return account
  }
}
