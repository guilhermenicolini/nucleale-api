import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, noContent } from '@/presentation/helpers'
import { CreateInvoice, SendInvoice } from '@/domain/usecases'

export class CreateInvoiceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createInvoice: CreateInvoice,
    private readonly sendInvoice: SendInvoice
  ) { }

  async handle (httpRequest: CreateInvoiceController.Request): Promise<HttpResponse> {
    try {
      const request = {
        userId: httpRequest.user,
        procedureId: httpRequest.procedure,
        amount: httpRequest.amount,
        data: httpRequest.data
      }
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const invoice = await this.createInvoice.create(request)
      if (invoice instanceof Error) {
        return badRequest(invoice as Error)
      }
      const sendResult = await this.sendInvoice.send(invoice)
      if (sendResult instanceof Error) {
        return badRequest(sendResult as Error)
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateInvoiceController {
  export type Request = {
    user: string
    procedure: string
    amount: number
    data: string | string[]
  }
}
