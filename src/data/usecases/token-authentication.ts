import { Authentication } from '@/domain/usecases'
import { Signer } from '@/data/protocols'

export class TokenAuthentication implements Authentication {
  constructor (
    private readonly signer: Signer
  ) { }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    const data = {
      sub: params.userId,
      acc: params.accountId
    }
    const token = await this.signer.sign(data)
    return {
      accessToken: token
    }
  }
}
