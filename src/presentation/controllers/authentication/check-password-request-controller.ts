import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { CheckAccountLink } from '@/domain/usecases'
import { RecordNotFoundError } from '@/presentation/errors'
import { ok, badRequest, serverError, notFound } from '@/presentation/helpers'

export class CheckPasswordRequestController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkAccountLink: CheckAccountLink
  ) { }

  async handle (httpRequest: CheckPasswordRequestController.Request): Promise<HttpResponse> {
    try {
      const request = { token: httpRequest.token }

      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const isValid = await this.checkAccountLink.check(request.token)
      if (!isValid) {
        return notFound(new RecordNotFoundError('Token não encontrado'))
      }

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CheckPasswordRequestController {
  export type Request = {
    token: string
  }
}
