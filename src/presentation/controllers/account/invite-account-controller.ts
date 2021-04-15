import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { InviteAccount } from '@/domain/usecases'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'

export class InviteAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly inviteAccount: InviteAccount
  ) { }

  async handle (request: InviteAccountController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { accountId, email } = request
      const result = await this.inviteAccount.invite(accountId, email)
      if (!result) {
        return badRequest(new EmailInUseError())
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace InviteAccountController {
  export type Request = {
    accountId: string,
    email: string
  }
}
