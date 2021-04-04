import { Middleware, HttpResponse } from '@/presentation/protocols'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError, InsufficientPermissionError } from '@/presentation/errors'
import { LoadAccountByToken } from '@/domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { authorization } = request
      if (authorization && authorization.startsWith('Bearer')) {
        const accessToken = authorization.substring(7)
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          if (account.isValid) {
            return ok({ userId: account.userId, accountId: account.accountId })
          } else {
            return forbidden(new InsufficientPermissionError())
          }
        }
      }
      return unauthorized(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    authorization?: string
  }
}
