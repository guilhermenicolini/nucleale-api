import { InvoiceModel } from '@/domain/models'

export interface LoadInvoice {
  load: (invoiceNo: number, accountId: string) => Promise<LoadInvoice.Result>
}

export namespace LoadInvoice {
  export type Result = InvoiceModel
}
