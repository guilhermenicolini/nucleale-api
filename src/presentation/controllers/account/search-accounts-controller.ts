import { Controller, HttpResponse } from '@/presentation/protocols'
import { SearchAccounts } from '@/domain/usecases'
import { serverError, ok } from '@/presentation/helpers'

export class SearchAccountsController implements Controller {
  constructor (
    private readonly searchAccounts: SearchAccounts
  ) { }

  async handle (request: SearchAccountsController.Request): Promise<HttpResponse> {
    try {
      const result = await this.searchAccounts.search(request.term)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SearchAccountsController {
  export type Request = {
    term: string
  }
}
