import { LoadInvoices } from '@/domain/usecases'

export interface LoadInvoicesRepository {
  load: (accountId: string) => Promise<LoadInvoicesRepository.Result>
}

export namespace LoadInvoicesRepository {
  export type Result = LoadInvoices.Result
}
