import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, noContent } from '@/presentation/helpers'
import { CreateInvoice } from '@/domain/usecases'

export class CreateInvoiceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createInvoice: CreateInvoice
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
      await this.createInvoice.create(request)
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
