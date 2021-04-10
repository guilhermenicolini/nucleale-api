import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadAccount, SaveAccount } from '@/domain/usecases'
import { notFound, noContent, serverError } from '@/presentation/helpers'
import { RecordNotFoundError } from '@/presentation/errors'
import { AccountStatus } from '@/domain/models'

export class ApproveAccountController implements Controller {
  constructor (
    private readonly loadAccount: LoadAccount,
    private readonly saveAccount: SaveAccount
  ) { }

  async handle (request: ApproveAccountController.Request): Promise<HttpResponse> {
    try {
      const { id } = request

      const account = await this.loadAccount.load(id)
      if (!account) {
        return notFound(new RecordNotFoundError('Account'))
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
