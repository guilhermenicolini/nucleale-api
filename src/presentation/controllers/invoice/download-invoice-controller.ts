import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadInvoice, GenerateInvoice } from '@/domain/usecases'
import { badRequest, notFound, serverError, ok } from '@/presentation/helpers'
import { RecordNotFoundError } from '@/presentation/errors'

export class DownloadInvoiceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadInvoice: LoadInvoice,
    private readonly generateInvoice: GenerateInvoice
  ) { }

  async handle (httpRequest: DownloadInvoiceController.Request): Promise<HttpResponse> {
    try {
      const request = {
        invoiceNo: httpRequest.invoiceNo,
        accountId: httpRequest.accountId
      }

      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const invoice = await this.loadInvoice.load(parseInt(request.invoiceNo), request.accountId)
      if (!invoice) {
        return notFound(new RecordNotFoundError('Nota fiscal não encontrada'))
      }
      const document = await this.generateInvoice.generate(invoice)
      return ok(document)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DownloadInvoiceController {
  export type Request = {
    invoiceNo: string
    accountId: string
  }
}
