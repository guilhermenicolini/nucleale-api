import { SaveInvoice } from '@/domain/usecases'
import { SaveInvoiceRepository } from '@/data/protocols'

export class DbSaveInvoice implements SaveInvoice {
  constructor (
    private readonly saveInvoiceRepository: SaveInvoiceRepository
  ) { }

  async save (param: SaveInvoiceRepository.Param): Promise<void> {
    await this.saveInvoiceRepository.save(param)
  }
}
