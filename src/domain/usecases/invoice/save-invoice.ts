import { InvoiceModel } from '@/domain/models'

export interface SaveInvoice {
  save: (param: SaveInvoice.Param) => Promise<void>
}

export namespace SaveInvoice {
  export type Param = Omit<InvoiceModel, 'id'>
}
