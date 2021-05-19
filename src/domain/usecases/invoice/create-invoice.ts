import { InvoiceModel } from '@/domain/models'

export interface CreateInvoice {
  create: (params: CreateInvoice.Params) => Promise<CreateInvoice.Result>
}

export namespace CreateInvoice {
  export type Params = {
    userId: string
    procedureId: string
    amount: number
    data: string | string[]
  }
  export type Result = Omit<InvoiceModel, 'id'>
}
