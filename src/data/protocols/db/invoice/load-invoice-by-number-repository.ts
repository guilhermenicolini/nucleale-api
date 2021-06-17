import { LoadInvoiceByNumber } from '@/domain/usecases'

export interface LoadInvoiceByNumberRepository {
  loadByNumber: (invoiceNo: number) => Promise<LoadInvoiceByNumberRepository.Result>
}

export namespace LoadInvoiceByNumberRepository {
  export type Result = LoadInvoiceByNumber.Result
}
