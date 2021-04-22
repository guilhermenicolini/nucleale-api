import { InvoiceModel } from '@/domain/models'

export interface LoadInvoicesFromFile {
  load: (buffer: Buffer) => Promise<LoadInvoicesFromFile.Result>
}

export namespace LoadInvoicesFromFile {
  export type Result = Omit<InvoiceModel, 'id'>[]
}
