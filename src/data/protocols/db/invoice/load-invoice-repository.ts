import { LoadInvoice } from '@/domain/usecases'

export interface LoadInvoiceRepository {
  loadOne: (invoiceNo: number, accountId: string) => Promise<LoadInvoiceRepository.Result>
}

export namespace LoadInvoiceRepository {
  export type Result = LoadInvoice.Result
}
