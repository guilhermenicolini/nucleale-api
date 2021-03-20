import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddAccount, Authentication } from '@/domain/usecases'
import { EmailInUseError } from '@/presentation/errors'
import { serverError, badRequest, ok } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = request
      const result = await this.addAccount.add({ email, password })
      if (!result.isValid) {
        return badRequest(new EmailInUseError())
      }
      const token = await this.authentication.auth({
        accountId: result.accountId,
        userId: result.userId
      })

      return ok(token)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    password: string
    passwordConfirmation: string
  }
}
