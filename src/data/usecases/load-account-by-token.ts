import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) { }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    try {
      const data = await this.decrypter.decrypt(accessToken)
      const token = {
        id: data.sub,
        accountId: data.acc
      }
      return role && role === data.role ? token : null
    } catch (error) {
      return null
    }
  }
}
