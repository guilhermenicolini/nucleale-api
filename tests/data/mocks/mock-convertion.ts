import { ObjectConverter } from '@/data/protocols/convertion'
import { CreateInvoice } from '@/domain/usecases'
import { mockInvoiceDb } from '@/tests/domain/mocks'

export class ModelsToInvoiceConverterSpy implements ObjectConverter<CreateInvoice.ModelToInvoiceInput, CreateInvoice.Result> {
  data: CreateInvoice.ModelToInvoiceInput
  result: CreateInvoice.Result = mockInvoiceDb()

  async convert (data: CreateInvoice.ModelToInvoiceInput): Promise<CreateInvoice.Result> {
    this.data = data
    return this.result
  }
}
