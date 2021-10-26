import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { noContent, handleError, badRequest } from '@/presentation/helpers'
import { LoadAccount, CreateCertificate, GenerateCertificate, SendCertificate } from '@/domain/usecases'
import { CertificateType } from '@/domain/models'

export class CreateCertificateController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly createCertificate: CreateCertificate,
    private readonly generateCertificate: GenerateCertificate,
    private readonly sendCertificate: SendCertificate
  ) { }

  async handle (httpRequest: CreateCertificateController.Request): Promise<HttpResponse> {
    try {
      const request = {
        userId: httpRequest.user,
        procedureId: httpRequest.procedure,
        type: httpRequest.type,
        date: httpRequest.date
      }
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const account = await this.loadAccount.load(request.userId)
      const cert = await this.createCertificate.create(request)
      const pdf = await this.generateCertificate.generate(cert)
      await this.sendCertificate.send({
        email: account.email,
        name: account.name,
        phone: account.mobilePhone,
        file: pdf
      })

      return noContent()
    } catch (error) {
      return handleError(error)
    }
  }
}

export namespace CreateCertificateController {
  export type Request = {
    user: string
    procedure: string
    type: CertificateType
    date: number
  }
}
