import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadInvoices } from '@/domain/usecases'
import { serverError, ok } from '@/presentation/helpers'

export class LoadInvoicesController implements Controller {
  constructor (
    private readonly loadInvoices: LoadInvoices
  ) { }

  async handle (request: LoadInvoicesController.Request): Promise<HttpResponse> {
    try {
      const { accountId } = request
      const invoices = await this.loadInvoices.load(accountId)
      return ok(invoices)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadInvoicesController {
  export type Request = {
    accountId: string
  }
}
