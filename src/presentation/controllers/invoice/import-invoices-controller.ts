import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadInvoices } from '@/domain/usecases'
import { serverError, noContent } from '@/presentation/helpers'

export class ImportInvoicesController implements Controller {
  constructor (
    private readonly loadInvoices: LoadInvoices
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      await this.loadInvoices.load()
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
