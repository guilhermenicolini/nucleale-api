import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddAccount, Authentication } from '@/domain/usecases'
import { EmailInUseError } from '@/presentation/errors'
import { serverError, badRequest, conflict, created } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { taxId, name, email, password, mobileCountry, mobilePhone, birth } = request
      const result = await this.addAccount.add({
        accountId: null,
        taxId,
        name,
        email,
        password,
        mobileCountry,
        mobilePhone,
        birth,
        status: 'awaitingVerification'
      })
      if (!result.isValid) {
        return conflict(new EmailInUseError())
      }
      const token = await this.authentication.auth({
        accountId: result.accountId,
        userId: result.userId
      })

      return created(token)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    taxId: string
    name: string
    email: string
    password: string
    passwordConfirmation: string
    mobileCountry: string
    mobilePhone: string
    birth: number
  }
}
