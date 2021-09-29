import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadAccountByEmail, GeneratePasswordRecoveryLink } from '@/domain/usecases'
import { RecordNotFoundError } from '@/presentation/errors'
import { badRequest, serverError, notFound, noContent } from '@/presentation/helpers'

export class PasswordRecoveryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadAccountByEmail: LoadAccountByEmail,
    private readonly generatePasswordRecoveryLink: GeneratePasswordRecoveryLink
  ) { }

  async handle (httpRequest: PasswordRecoveryController.Request): Promise<HttpResponse> {
    try {
      const request = { email: httpRequest.email }

      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const account = await this.loadAccountByEmail.load(request.email)
      if (!account) {
        return notFound(new RecordNotFoundError('E-mail não encontrado'))
      }
      await this.generatePasswordRecoveryLink.generate(account)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace PasswordRecoveryController {
  export type Request = {
    email: string
  }
}
