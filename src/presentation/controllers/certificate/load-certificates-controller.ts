import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadCertificates } from '@/domain/usecases'
import { ok, handleError } from '@/presentation/helpers'

export class LoadCertificatesController implements Controller {
  constructor (
    private readonly loadCertificates: LoadCertificates
  ) { }

  async handle (request: LoadCertificatesController.Request): Promise<HttpResponse> {
    try {
      const { accountId } = request
      const invoices = await this.loadCertificates.load(accountId)
      return ok(invoices)
    } catch (error) {
      return handleError(error)
    }
  }
}

export namespace LoadCertificatesController {
  export type Request = {
    accountId: string
  }
}
