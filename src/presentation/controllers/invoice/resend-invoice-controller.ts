import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, noContent, notFound } from '@/presentation/helpers'
import { LoadAccountByEmail, LoadInvoiceByNumber, GenerateInvoice, MailInvoice } from '@/domain/usecases'
import { RecordNotFoundError } from '@/presentation/errors'

export class ResendInvoiceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadAccountByEmail: LoadAccountByEmail,
    private readonly loadInvoiceByNumber: LoadInvoiceByNumber,
    private readonly generateInvoice: GenerateInvoice,
    private readonly mailInvoice: MailInvoice
  ) { }

  async handle (httpRequest: ResendInvoiceController.Request): Promise<HttpResponse> {
    try {
      const request = {
        invoiceNo: httpRequest.iId
      }
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const invoice = await this.loadInvoiceByNumber.loadByNumber(request.invoiceNo)
      if (!invoice) {
        return notFound(new RecordNotFoundError('Nota fiscal não encontrada'))
      }

      const account = await this.loadAccountByEmail.load(invoice.taker.email)
      if (!account) {
        return notFound(new RecordNotFoundError('Conta não encontrada'))
      }

      const pdf = await this.generateInvoice.generate(invoice)

      await this.mailInvoice.send({
        to: {
          email: account.email,
          phone: account.mobilePhone,
          name: account.name.split(' ')[0],
          taxId: null,
          registryId: null,
          address: null
        },
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
    iId: number
  }
}
