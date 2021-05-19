import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, noContent } from '@/presentation/helpers'

export class CreateInvoiceController implements Controller {
  constructor (
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: CreateInvoiceController.Request): Promise<HttpResponse> {
    try {
      const request = {
        user: httpRequest.user,
        procedure: httpRequest.procedure,
        amount: httpRequest.amount,
        data: httpRequest.data
      }
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
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
    data: string
  }
}
