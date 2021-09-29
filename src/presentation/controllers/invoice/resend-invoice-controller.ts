import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, noContent, notFound } from '@/presentation/helpers'
import { LoadInvoiceByNumber, GenerateInvoice, MailInvoice } from '@/domain/usecases'
import { RecordNotFoundError } from '@/presentation/errors'

export class ResendInvoiceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadInvoiceByNumber: LoadInvoiceByNumber,
    private readonly generateInvoice: GenerateInvoice,
    private readonly mailInvoice: MailInvoice
  ) { }

  async handle (httpRequest: ResendInvoiceController.Request): Promise<HttpResponse> {
    try {
      const request = {
        invoiceNo: httpRequest.invoiceNo
      }
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      console.log('resend', request)
      const invoice = await this.loadInvoiceByNumber.loadByNumber(parseInt(request.invoiceNo))
      if (!invoice) {
        return notFound(new RecordNotFoundError('Nota fiscal não encontrada'))
      }

      const pdf = await this.generateInvoice.generate(invoice)

      await this.mailInvoice.send({
        to: invoice.taker,
        invoiceNo: invoice.invoiceNo,
        pdf: pdf.buffer
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace ResendInvoiceController {
  export type Request = {
    invoiceNo: string
  }
}
