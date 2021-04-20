import { InvoiceModel } from '@/domain/models'

export interface LoadInvoices {
  load: () => Promise<LoadInvoices.Result>
}

export namespace LoadInvoices {
  export type Result = InvoiceModel[]
}
