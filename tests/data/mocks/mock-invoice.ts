import {
  SaveInvoiceRepository
} from '@/data/protocols'

export class SaveInvoiceRepositorySpy implements SaveInvoiceRepository {
  param: SaveInvoiceRepository.Param

  async save (param: SaveInvoiceRepository.Param): Promise<void> {
    this.param = param
  }
}
