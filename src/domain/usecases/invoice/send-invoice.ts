import { InvoiceModel } from '@/domain/models'

export interface SendInvoice {
  send: (params: SendInvoice.Params) => Promise<SendInvoice.Result>
}

export namespace SendInvoice {
  export type Params = Omit<InvoiceModel, 'id'>
  export type Result = {
    invoiceNo: number
    verificationCode: string
  } | Error
}
