import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadInvoicesFromBuffer, SaveInvoice } from '@/domain/usecases'
import { serverError, noContent, badRequest } from '@/presentation/helpers'

export class UploadInvoicesController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadInvoicesFromBuffer: LoadInvoicesFromBuffer,
    private readonly saveInvoice: SaveInvoice
  ) { }

  async handle (httpRequest: UploadInvoicesController.Request): Promise<HttpResponse> {
    try {
      const request = {
        files: httpRequest.files
      }
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const invoices = await this.loadInvoicesFromBuffer.load(request.files[0].buffer)
      for (const invoice of invoices) {
        await this.saveInvoice.save(invoice)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UploadInvoicesController {
  export type Request = { files: any }
}
