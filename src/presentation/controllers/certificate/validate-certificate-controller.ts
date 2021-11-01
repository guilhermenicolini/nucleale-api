import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadCertificateByHash } from '@/domain/usecases'
import { ok, handleError } from '@/presentation/helpers'
import { CertificateModel } from '@/domain/models'

export class ValidateCertificateController implements Controller {
  constructor (
    private readonly loadCertificateByHash: LoadCertificateByHash
  ) { }

  async handle (request: ValidateCertificateController.Request): Promise<HttpResponse> {
    try {
      const { hash } = request
      const certificate = await this.loadCertificateByHash.load(hash)
      const response: ValidateCertificateController.Response = ({
        hash: certificate.hash,
        course: certificate.course,
        date: certificate.date
      })
      return ok(response)
    } catch (error) {
      return handleError(error)
    }
  }
}

export namespace ValidateCertificateController {
  export type Request = {
    hash: string
  }
  export type Response = Pick<CertificateModel, 'hash' | 'course' | 'date'>
}
