import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { DownloadInvoice } from '@/domain/usecases'
import { badRequest, serverError, ok } from '@/presentation/helpers'

export class DownloadInvoiceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly downloadInvoice: DownloadInvoice
  ) { }

  async handle (httpRequest: DownloadInvoiceController.Request): Promise<HttpResponse> {
    try {
      const request = {
        id: httpRequest.id,
        accountId: httpRequest.accountId
      }

      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const invoice = await this.downloadInvoice.download(request.id, request.accountId)
      return ok(invoice)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DownloadInvoiceController {
  export type Request = {
    id: string
    accountId: string
  }
}
