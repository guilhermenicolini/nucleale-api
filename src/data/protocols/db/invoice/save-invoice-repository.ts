import { SaveInvoice } from '@/domain/usecases'

export interface SaveInvoiceRepository {
  save: (param: SaveInvoiceRepository.Param) => Promise<void>
}

export namespace SaveInvoiceRepository {
  export type Param = SaveInvoice.Param
}
