import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadAccount } from '@/domain/usecases'
import { serverError, ok, notFound } from '@/presentation/helpers'
import { RecordNotFoundError } from '@/presentation/errors'

export class LoadAccountController implements Controller {
  constructor (
    private readonly loadAccount: LoadAccount
  ) { }

  async handle (request: LoadAccountController.Request): Promise<HttpResponse> {
    try {
      const account = await this.loadAccount.load(request.userId)
      if (!account) {
        return notFound(new RecordNotFoundError('Account'))
      }
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAccountController {
  export type Request = {
    userId: string
  }
}
