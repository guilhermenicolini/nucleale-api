import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadChildrens } from '@/domain/usecases'
import { serverError, ok } from '@/presentation/helpers'

export class LoadChildrensController implements Controller {
  constructor (
    private readonly loadChildrens: LoadChildrens
  ) { }

  async handle (request: LoadChildrensController.Request): Promise<HttpResponse> {
    try {
      const { accountId } = request
      const childrens = await this.loadChildrens.load(accountId)
      return ok(childrens)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadChildrensController {
  export type Request = {
    accountId: string
  }
}
