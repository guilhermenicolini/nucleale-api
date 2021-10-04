import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { VerifyAccount, Authentication } from '@/domain/usecases'
import { InvalidCredentialsError } from '@/presentation/errors'
import { serverError, badRequest, unauthorized, ok } from '@/presentation/helpers'

export class LoginController implements Controller {
  constructor (
    private readonly verifyAccount: VerifyAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = request
      const result = await this.verifyAccount.verify({ email, password })
      if (!result) {
        return unauthorized(new InvalidCredentialsError())
      }

      const token = await this.authentication.auth({
        accountId: result.accountId,
        userId: result.userId,
        role: result.role
      })

      return ok(token)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
