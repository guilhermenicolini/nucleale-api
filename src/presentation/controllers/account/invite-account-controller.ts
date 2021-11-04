import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { InviteAccount, LoadAccount } from '@/domain/usecases'
import { badRequest, serverError, noContent, notFound } from '@/presentation/helpers'
import { EmailInUseError, RecordNotFoundError } from '@/presentation/errors'
import { Messagefy, Sender } from '@/data/protocols'
import env from '@/main/config/env'

export class InviteAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly inviteAccount: InviteAccount,
    private readonly messagefy: Messagefy,
    private readonly sender: Sender
  ) { }

  async handle (request: InviteAccountController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { userId, accountId, email } = request

      const account = await this.loadAccount.load(userId)
      if (!account) {
        return notFound(new RecordNotFoundError('Conta não encontrada'))
      }

      const result = await this.inviteAccount.invite(accountId, email)
      if (!result) {
        return badRequest(new EmailInUseError())
      }

      const name = account.name.split(' ')[0]

      const message = await this.messagefy.create({
        subject: `Convite de ${name}`,
        name,
        email,
        url: `${env.appUrl}/sign-up`
      })

      this.sender.send(message)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace InviteAccountController {
  export type Request = {
    userId: string
    accountId: string
    email: string
  }
}
