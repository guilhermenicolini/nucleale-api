import {
  LoadInvoicesFromBuffer,
  SaveInvoice
} from '@/domain/usecases'
import { mockInvoice } from '@/tests/domain/mocks'

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
