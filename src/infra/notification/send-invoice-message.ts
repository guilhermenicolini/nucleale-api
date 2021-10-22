import { Messagefy } from '@/data/protocols'
import { MailInvoice } from '@/domain/usecases'

export class SendInvoiceMessage implements Messagefy {
  async create (data: SendInvoiceMessage.Model): Promise<Messagefy.Result> {
    return {
      subject: `Nota Fiscal #${data.invoiceNo}`,
      email: data.to.email,
      phone: data.to.phone,
      text: `Olá, ${data.to.name}. Sua nota fiscal foi gerada e já estamos te encaminhado.`,
      file: {
        name: `nf${data.invoiceNo}.pdf`,
        base64: data.pdf.toString('base64'),
        mimeType: 'application/pdf'
      }
    }
  }
}

export namespace SendInvoiceMessage {
  export type Model = MailInvoice.Param
}
