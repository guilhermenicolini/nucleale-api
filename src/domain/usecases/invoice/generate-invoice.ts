import { InvoiceModel } from '@/domain/models'
export interface GenerateInvoice {
  generate: (model: GenerateInvoice.Model) => Promise<GenerateInvoice.Result>
}

export namespace GenerateInvoice {
  export type Model = Omit<InvoiceModel, 'id'>
  export type Result = {
    fileName: string
    buffer: any
  }
}
