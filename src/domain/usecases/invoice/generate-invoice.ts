import { InvoiceModel } from '@/domain/models'
export interface GenerateInvoice {
  generate: (model: GenerateInvoice.Model) => Promise<GenerateInvoice.Result>
}

export namespace GenerateInvoice {
  export type Model = InvoiceModel
  export type Result = {
    fileName: string
    pdf: any
  }
}
