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
        isValid: true,
        id: data.sub,
        accountId: data.acc
      }
      if (role && role !== data.role) {
        return {
          isValid: false,
          id: null,
          accountId: null
        }
      }
      return token
    } catch (error) {
      return null
    }
  }
}
