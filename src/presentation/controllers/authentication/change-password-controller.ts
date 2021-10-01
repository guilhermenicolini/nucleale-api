import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { ChangePassword } from '@/domain/usecases'
import { serverError, badRequest, noContent, notFound } from '@/presentation/helpers'
import { RecordNotFoundError } from '@/presentation/errors'

export class ChangePasswordController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly changePassword: ChangePassword
  ) { }

  async handle (request: ChangePasswordController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const result = await this.changePassword.change({
        token: request.token,
        password: request.password
      })

      if (result instanceof RecordNotFoundError) {
        return notFound(result)
      }

      if (result instanceof Error) {
        return badRequest(result)
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace ChangePasswordController {
  export type Request = {
    token: string
    password: string
    passwordConfirmation: string
  }
}
