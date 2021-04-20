import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadInvoices, SaveInvoice } from '@/domain/usecases'
import { serverError, noContent } from '@/presentation/helpers'

export class ImportInvoicesController implements Controller {
  constructor (
    private readonly loadInvoices: LoadInvoices,
    private readonly saveInvoice: SaveInvoice
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const invoices = await this.loadInvoices.load()
      for (const invoice of invoices) {
        await this.saveInvoice.save(invoice)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
