import {
  LoadInvoices,
  SaveInvoice
} from '@/domain/usecases'
import { mockInvoice } from '@/tests/domain/mocks'

export class LoadInvoicesSpy implements LoadInvoices {
  result: LoadInvoices.Result = [mockInvoice(), mockInvoice()]

  async load (): Promise<LoadInvoices.Result> {
    return this.result
  }
}

export class SaveInvoiceSpy implements SaveInvoice {
  param: SaveInvoice.Param

  async save (param: SaveInvoice.Param): Promise<void> {
    this.param = param
  }
}
