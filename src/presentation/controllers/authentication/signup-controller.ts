import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddAccount, Authentication, LoadInvitation } from '@/domain/usecases'
import { EmailInUseError } from '@/presentation/errors'
import { serverError, badRequest, conflict, created } from '@/presentation/helpers'
import { AccountStatus, AccountRoles } from '@/domain/models'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
    private readonly loadInvitation: LoadInvitation
  ) { }

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { taxId, name, email, password, mobilePhone, birth } = request

      const accountId = await this.loadInvitation.load(email)

      const result = await this.addAccount.add({
        accountId,
        taxId,
        name,
        email,
        password,
        mobilePhone,
        birth,
        status: AccountStatus.awaitingVerification,
        role: AccountRoles.user
      })
      if (!result.isValid) {
        return conflict(new EmailInUseError())
      }
      const token = await this.authentication.auth({
        accountId: result.accountId,
        userId: result.userId,
        role: result.role
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
    mobilePhone: string
    birth: number
  }
}
