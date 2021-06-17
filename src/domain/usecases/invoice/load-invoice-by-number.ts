import { InvoiceModel } from '@/domain/models'

export interface LoadInvoiceByNumber {
  loadByNumber: (invoiceNo: number) => Promise<LoadInvoiceByNumber.Result>
}

export namespace LoadInvoiceByNumber {
  export type Result = InvoiceModel
}
