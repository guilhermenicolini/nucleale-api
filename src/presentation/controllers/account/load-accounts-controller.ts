import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadAccounts } from '@/domain/usecases'
import { serverError, ok } from '@/presentation/helpers'

export class LoadAccountsController implements Controller {
  constructor (
    private readonly loadAccounts: LoadAccounts
  ) { }

  async handle (request: LoadAccountsController.Request): Promise<HttpResponse> {
    try {
      const result = await this.loadAccounts.loadAll(request.accountId, request.userId)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAccountsController {
  export type Request = {
    userId: string
    accountId: string
  }
}
