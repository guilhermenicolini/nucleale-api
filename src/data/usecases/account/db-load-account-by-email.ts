import { LoadAccountByEmail } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols'

export class DbLoadAccountByEmail implements LoadAccountByEmail {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async load (email: string): Promise<LoadAccountByEmail.Result> {
    const account = await this.loadAccountByEmailRepository.load(email)
    return account
  }
}
