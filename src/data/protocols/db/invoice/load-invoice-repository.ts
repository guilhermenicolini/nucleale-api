import { LoadInvoice } from '@/domain/usecases'

export interface LoadInvoiceRepository {
  loadOne: (id: string, accountId: string) => Promise<LoadInvoiceRepository.Result>
}

export namespace LoadInvoiceRepository {
  export type Result = LoadInvoice.Result
}
