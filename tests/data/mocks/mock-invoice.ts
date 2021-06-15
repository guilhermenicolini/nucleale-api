import {
  SaveInvoiceRepository,
  LoadInvoicesRepository,
  LoadInvoiceRepository,
  LoadNextRpsRepository
} from '@/data/protocols'
import { mockInvoiceDb, mockLoadInvoice } from '@/tests/domain/mocks'

import faker from 'faker'

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

export class LoadInvoiceRepositorySpy implements LoadInvoiceRepository {
  id: string
  accountId: string
  result: LoadInvoiceRepository.Result = mockInvoiceDb()

  async loadOne (id: string, accountId: string): Promise<LoadInvoiceRepository.Result> {
    this.id = id
    this.accountId = accountId
    return this.result
  }
}

export class LoadNextRpsRepositorySpy implements LoadNextRpsRepository {
  result = faker.datatype.number()

  async next (): Promise<number> {
    return this.result
  }
}
