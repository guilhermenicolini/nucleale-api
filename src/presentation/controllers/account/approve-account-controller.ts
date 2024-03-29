import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadAccount, SaveAccount } from '@/domain/usecases'
import { notFound, noContent, serverError, badRequest } from '@/presentation/helpers'
import { RecordNotFoundError, InvalidStatusError } from '@/presentation/errors'
import { AccountStatus } from '@/domain/models'

export class ApproveAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly saveAccount: SaveAccount
  ) { }

  async handle (request: ApproveAccountController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { id } = request

      const account = await this.loadAccount.load(id)
      if (!account) {
        return notFound(new RecordNotFoundError('Conta não encontrada'))
      }

      if (account.status !== AccountStatus.awaitingVerification) {
        return badRequest(new InvalidStatusError())
      }

      await this.saveAccount.save(id, {
        status: AccountStatus.active
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace ApproveAccountController {
  export type Request = {
    id: string
  }
}
