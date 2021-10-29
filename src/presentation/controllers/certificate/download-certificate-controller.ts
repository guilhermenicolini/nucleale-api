import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadCertificateByHash, GenerateCertificate } from '@/domain/usecases'
import { badRequest, ok, handleError } from '@/presentation/helpers'
import { RecordNotFoundError } from '@/presentation/errors'

export class DownloadCertificateController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadCertificateByHash: LoadCertificateByHash,
    private readonly generateCertificate: GenerateCertificate
  ) { }

  async handle (httpRequest: DownloadCertificateController.Request): Promise<HttpResponse> {
    try {
      const request = {
        hash: httpRequest.hash,
        accountId: httpRequest.accountId
      }

      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const certificate = await this.loadCertificateByHash.load(request.hash)
      if (certificate.accountId !== request.accountId) {
        throw new RecordNotFoundError('Certificado não encontrado')
      }

      const file = await this.generateCertificate.generate(certificate)

      return ok({
        fileName: file.name,
        buffer: Buffer.from(file.base64, 'base64')
      })
    } catch (error) {
      return handleError(error)
    }
  }
}

export namespace DownloadCertificateController {
  export type Request = {
    hash: string
    accountId: string
  }
}
