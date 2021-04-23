import { InvoiceModel } from '@/domain/models'

export interface LoadInvoicesFromBuffer {
  load: (buffer: Buffer) => Promise<LoadInvoicesFromBuffer.Result>
}

export namespace LoadInvoicesFromBuffer {
  export type Result = Omit<InvoiceModel, 'id'>[]
}
