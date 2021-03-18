import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'
import { serverError, badRequest } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount, private readonly validation: Validation) { }
  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      const { email, password } = request
      await this.addAccount.add({ email, password })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    password: string
    passwordConfirmation: string
  }
}
