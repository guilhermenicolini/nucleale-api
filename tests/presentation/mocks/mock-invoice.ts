import {
  LoadInvoicesFromBuffer,
  SaveInvoice,
  LoadInvoices,
  DownloadInvoice
} from '@/domain/usecases'
import { mockInvoice, mockLoadInvoice } from '@/tests/domain/mocks'

import faker from 'faker'

export class LoadInvoicesFromBufferSpy implements LoadInvoicesFromBuffer {
  buffer: Buffer
  result: LoadInvoicesFromBuffer.Result = [mockInvoice(), mockInvoice()]

  async load (buffer: Buffer): Promise<LoadInvoicesFromBuffer.Result> {
    this.buffer = buffer
    return this.result
  }
}

export class SaveInvoiceSpy implements SaveInvoice {
  param: SaveInvoice.Param

  async save (param: SaveInvoice.Param): Promise<void> {
    this.param = param
  }
}

export class LoadInvoicesSpy implements LoadInvoices {
  accountId: string
  result: LoadInvoices.Result = [
    mockLoadInvoice(),
    mockLoadInvoice()
  ]

  async load (accountId: string): Promise<LoadInvoices.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class DownloadInvoiceSpy implements DownloadInvoice {
  id: string
  accountId: string
  result: DownloadInvoice.Result = {
    fileName: faker.system.commonFileName('pdf'),
    pdf: {}
  }

  async download (id: string, accountId: string): Promise<DownloadInvoice.Result> {
    this.id = id
    this.accountId = accountId
    return this.result
  }
}
