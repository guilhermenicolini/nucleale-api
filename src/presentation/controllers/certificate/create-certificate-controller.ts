import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { noContent, handleError, badRequest } from '@/presentation/helpers'
import { CreateCertificate } from '@/domain/usecases'
import { CertificateType } from '@/domain/models'

export class CreateCertificateController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createCertificate: CreateCertificate
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

      await this.createCertificate.create(request)

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
