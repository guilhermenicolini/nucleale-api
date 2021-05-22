import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, noContent } from '@/presentation/helpers'
import { CreateInvoice, GenerateInvoice, MailInvoice, SaveInvoice, SendInvoice } from '@/domain/usecases'

export class CreateInvoiceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createInvoice: CreateInvoice,
    private readonly sendInvoice: SendInvoice,
    private readonly saveInvoice: SaveInvoice,
    private readonly generateInvoice: GenerateInvoice,
    private readonly mailInvoice: MailInvoice
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

      invoice.invoiceNo = sendResult.invoiceNo
      invoice.verificationCode = sendResult.verificationCode

      await this.saveInvoice.save(invoice)
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

export namespace CreateInvoiceController {
  export type Request = {
    user: string
    procedure: string
    amount: number
    data: string | string[]
  }
}
