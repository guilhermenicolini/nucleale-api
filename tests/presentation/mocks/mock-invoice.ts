import {
  LoadInvoicesFromBuffer,
  SaveInvoice,
  LoadInvoices
} from '@/domain/usecases'
import { mockInvoice, mockLoadInvoice } from '@/tests/domain/mocks'

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
