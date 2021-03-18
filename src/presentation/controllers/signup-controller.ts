import { Controller, HttpResponse } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'
import { serverError } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) { }
  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
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
