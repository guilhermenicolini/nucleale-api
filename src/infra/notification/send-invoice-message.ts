import { Messagefy } from '@/data/protocols'
import { MailInvoice } from '@/domain/usecases'

export class SendInvoiceMessage implements Messagefy {
  create (data: SendInvoiceMessage.Model): Messagefy.Result {
    return {
      email: data.to.email,
      phone: data.to.phone,
      text: `Olá, ${data.to.name}. Sua nota fiscal foi gerada`,
      file: {
        name: `nf${data.invoiceNo}.pdf`,
        base64: data.pdf.toString('base64')
      }
    }
  }
}

export namespace SendInvoiceMessage {
  export type Model = MailInvoice.Param
}
