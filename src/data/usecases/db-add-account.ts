import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) { }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.hasher.hash(params.password)
    return null
  }
}
