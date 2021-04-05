import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadAccountsByStatus } from '@/domain/usecases'
import { serverError, badRequest, ok } from '@/presentation/helpers'

export class LoadAccountsByStatusController implements Controller {
  constructor (
    private readonly loadAccountsByStatus: LoadAccountsByStatus,
    private readonly validation: Validation
  ) { }

  async handle (request: LoadAccountsByStatusController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { status } = request
      const result = await this.loadAccountsByStatus.loadByStatus(status)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAccountsByStatusController {
  export type Request = {
    status: LoadAccountsByStatus.Params
  }
}
