import {
  LoadInvoices
} from '@/domain/usecases'
import { mockInvoice } from '@/tests/domain/mocks'

export class LoadInvoicesSpy implements LoadInvoices {
  result: LoadInvoices.Result = [mockInvoice(), mockInvoice()]

  async load (): Promise<LoadInvoices.Result> {
    return this.result
  }
}
