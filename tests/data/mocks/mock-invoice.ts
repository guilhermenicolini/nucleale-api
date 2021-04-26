import {
  SaveInvoiceRepository,
  LoadInvoicesRepository
} from '@/data/protocols'
import { mockLoadInvoice } from '@/tests/domain/mocks'

export class SaveInvoiceRepositorySpy implements SaveInvoiceRepository {
  param: SaveInvoiceRepository.Param

  async save (param: SaveInvoiceRepository.Param): Promise<void> {
    this.param = param
  }
}

export class LoadInvoicesRepositorySpy implements LoadInvoicesRepository {
  accountId: string
  result: LoadInvoicesRepository.Result = [
    mockLoadInvoice(),
    mockLoadInvoice()
  ]

  async load (accountId: string): Promise<LoadInvoicesRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}
