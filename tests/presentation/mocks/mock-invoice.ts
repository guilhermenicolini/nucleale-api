import {
  LoadInvoicesFromFile,
  SaveInvoice
} from '@/domain/usecases'
import { mockInvoice } from '@/tests/domain/mocks'

export class LoadInvoicesFromFileSpy implements LoadInvoicesFromFile {
  buffer: Buffer
  result: LoadInvoicesFromFile.Result = [mockInvoice(), mockInvoice()]

  async load (buffer: Buffer): Promise<LoadInvoicesFromFile.Result> {
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
