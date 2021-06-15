import { InvoicePersonModel } from '@/domain/models'

export interface MailInvoice {
  send: (param: MailInvoice.Param) => Promise<void>
}

export namespace MailInvoice {
  export type Param = {
    to: InvoicePersonModel
    invoiceNo: number
    pdf: Buffer
  }
}
