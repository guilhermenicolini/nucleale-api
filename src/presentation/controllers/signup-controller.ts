import { Controller, HttpResponse } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) { }
  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    const { email, password } = request
    await this.addAccount.add({ email, password })
    return null
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    password: string
    passwordConfirmation: string
  }
}
