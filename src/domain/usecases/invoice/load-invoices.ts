import { InvoiceModel } from '@/domain/models'

export interface LoadInvoices {
  load: (accountId: string) => Promise<LoadInvoices.Result>
}

export namespace LoadInvoices {
  export type Result = Pick<InvoiceModel, 'id' | 'invoiceNo' | 'invoiceDate' | 'description'>[]
}
