import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteChildren } from '@/domain/usecases'
import { serverError, notFound, noContent } from '@/presentation/helpers'
import { RecordNotFoundError } from '@/presentation/errors'

export class DeleteChildrenController implements Controller {
  constructor (
    private readonly deleteChildren: DeleteChildren
  ) { }

  async handle (httpRequest: DeleteChildrenController.Request): Promise<HttpResponse> {
    try {
      const request = {
        accountId: httpRequest.accountId,
        id: httpRequest.id
      }

      const result = await this.deleteChildren.delete(request)
      if (!result) {
        return notFound(new RecordNotFoundError('Children'))
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteChildrenController {
  export type Request = {
    accountId: string
    id: string
  }
}
